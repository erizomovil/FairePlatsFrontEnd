import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Recipe } from '../models/recipe.models';
import { RecipeService } from '../service/recipe.service';
import { IngredientService } from '../service/ingredient.service';
import { IngredientsRecipesService } from '../service/relation.service';
import { Ingredient } from '../models/ingredient.models';
import { Relation } from '../models/relation.models';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.scss'],
})
export class AddRecipeFormComponent implements OnInit {
  recipe: Recipe = {
    title: '',
    difficulty: 1,
    time: 0,
    image: '',
    ingredients: [],
  };

  ingredients: Ingredient[] = [];
  ingredientRelations: Relation[] = [];

  @Output() recipeAdded = new EventEmitter<boolean>();

  constructor(
    private modalController: ModalController,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private ingredientsRecipesService: IngredientsRecipesService
  ) {}

  ngOnInit() {
    this.loadIngredients();
  }

  loadIngredients() {
    this.ingredientService.getIngredients().subscribe({
      next: (ingredients) => {
        this.ingredients = ingredients;
      },
      error: (err) => {
        console.error('Error al cargar los ingredientes:', err);
      },
    });
  }

  getIngredientTitleById(ingredientId: number): string {
    const ingredient = this.ingredients.find((ing) => ing.id === ingredientId);
    return ingredient ? ingredient.title : 'Desconocido';
  }

  dismiss() {
    this.modalController.dismiss();
  }

  submitRecipe() {
    if (this.recipe.title && this.recipe.difficulty && this.recipe.time) {
      this.recipeService.addRecipe(this.recipe).subscribe({
        next: (newRecipe) => {
          const recipeId = newRecipe.id!;

          // Usamos la estructura nueva que esperas
          const relations = this.ingredientRelations.map((rel) => ({
            recipe: {
              id: recipeId,
            },
            ingredient: {
              id: rel.ingredient.id,
            },
            quantity: rel.quantity,
          }));

          console.log(relations);
          this.ingredientsRecipesService.createRelations(relations).subscribe({
            next: () => {
              console.log('Relaciones creadas');
              this.recipeAdded.emit(true);
              this.dismiss();
            },
            error: (err) => {
              console.error('Error al crear relaciones:', err);
              this.recipeAdded.emit(false);
            },
          });
        },
        error: (err) => {
          console.error('Error al añadir receta:', err);
          this.recipeAdded.emit(false);
        },
      });
    } else {
      console.error('Faltan campos requeridos.');
    }
  }

  updateIngredientSelection(selectedIds: number[]) {
    this.ingredientRelations = this.ingredientRelations.filter((rel) =>
      selectedIds.includes(rel.ingredient.id)
    );
    selectedIds.forEach((idIngredient) => {
      if (
        !this.ingredientRelations.some(
          (rel) => rel.ingredient.id === idIngredient
        )
      ) {
        this.ingredientRelations.push({
          recipe: { id: 0 },
          ingredient: { id: idIngredient },
          quantity: '0',
        });
      }
    });
  }
}
