import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../service/recipe.service';
import { IngredientsRecipesService } from '../../service/relation.service';
import { IngredientService } from '../../service/ingredient.service';
import { Recipe } from '../../models/recipe.models';
import { Ingredient } from '../../models/ingredient.models';
import { StaticStarsComponent } from '../../components/static-stars/static-stars.component';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
  recipe!: Recipe;
  originalRecipe!: Recipe;
  ingredientsWithQuantities: {
    ingredient: Ingredient;
    quantity: string | undefined;
  }[] = [];
  ingredients: Ingredient[] = [];
  isLoading = true;
  isEditing = false;
  id = 0;
  ingredientModalOpen = false;
  availableIngredients: Ingredient[] = [];
  selectedIngredient: Ingredient | null = null;
  ingredientQuantity: string = '';
  showIngredientSelector = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private ingredientsRecipesService: IngredientsRecipesService
  ) {}

  ngOnInit() {
    const recipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.id = recipeId;

    this.recipeService.getRecipe(recipeId).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.originalRecipe = { ...recipe };
        this.loadIngredients(recipeId);
      },
      error: (err) => {
        console.error('Error loading recipe', err);
        this.isLoading = false;
      },
    });
  }

  loadIngredients(recipeId: number) {
    this.ingredientsRecipesService.getAllIngredientsRecipes().subscribe({
      next: (relations) => {
        const filteredRelations = relations.filter(
          (relation) => relation.recipe.id === recipeId
        );

        this.ingredientService.getIngredients().subscribe({
          next: (ingredients) => {
            this.ingredients = ingredients;
            this.ingredientsWithQuantities = filteredRelations.map(
              (relation) => {
                const ingredient = ingredients.find(
                  (ing) => ing.id === relation.ingredient.id
                );
                return {
                  ingredient: ingredient!,
                  quantity: relation.quantity,
                };
              }
            );
            this.updateAvailableIngredients();
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error loading ingredients', err);
            this.isLoading = false;
          },
        });
      },
      error: (err) => {
        console.error('Error loading ingredient-recipe relations', err);
        this.isLoading = false;
      },
    });
  }

  openEditForm() {
    this.isEditing = true;
    this.originalRecipe = { ...this.recipe };
  }

  cancelEdit() {
    this.isEditing = false;
    this.recipe = { ...this.originalRecipe };
  }

  submitEditForm() {
    if (this.recipe.id) {
      this.recipeService.updateRecipe(this.recipe.id, this.recipe).subscribe({
        next: () => {
          this.isEditing = false;
          this.loadRecipe();
        },
        error: (err) => {
          console.error('Error updating recipe', err);
        },
      });
    }
  }

  loadRecipe() {
    const recipeId = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(recipeId).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.loadIngredients(recipeId);
      },
      error: (err) => {
        console.error('Error loading recipe', err);
        this.isLoading = false;
      },
    });
  }

  deleteRelacion(ingredientId: number) {
    this.ingredientsRecipesService
      .deleteIngredientRecipe(this.id, ingredientId)
      .subscribe(
        (response) => {
          this.ingredientsWithQuantities =
            this.ingredientsWithQuantities.filter(
              (item) => item.ingredient.id !== ingredientId
            );
        },
        (error) => {
          console.error('Error al eliminar ingrediente', error);
        }
      );
  }

  deleteRecipe() {
    if (this.id) {
      this.recipeService.deleteRecipe(this.id).subscribe({
        next: () => {
          console.log('Receta eliminada exitosamente');
        },
        error: (err) => console.error('Error eliminando la receta', err),
      });
    }
  }

  private updateAvailableIngredients() {
    this.availableIngredients = this.ingredients.filter(
      (ingredient) =>
        !this.ingredientsWithQuantities.some(
          (item) => item.ingredient.id === ingredient.id
        )
    );
  }

  updateIngredientSelection(selectedIds: number[]) {
    this.selectedIngredient =
      this.ingredients.find((ingredient) =>
        selectedIds.includes(ingredient.id)
      ) || null;
  }

  addIngredient() {
    console.log(this.selectedIngredient + '&' + this.ingredientQuantity);
    if (this.selectedIngredient && this.ingredientQuantity) {
      const ingredient = this.selectedIngredient;
      console.log(
        'Adding ingredient with ID:',
        ingredient.id,
        'to recipe with ID:',
        this.id
      );
      const newRelation = {
        recipe: { id: this.id },
        ingredient: { id: ingredient.id },
        quantity: this.ingredientQuantity.toString(),
      };
      console.log(newRelation);
      this.ingredientsRecipesService
        .createIngredientRecipe(newRelation)
        .subscribe({
          next: (response) => {
            console.log('Relation created successfully:', response);
            this.ingredientsWithQuantities.push({
              ingredient,
              quantity: this.ingredientQuantity.toString(),
            });
            this.selectedIngredient = null;
            this.ingredientQuantity = '';
            this.updateAvailableIngredients();
          },
          error: (err) => {
            console.error('Error adding ingredient:', err);
          },
        });
    }
  }
  handleImageError() {
    this.recipe.image = 'assets/images/placeholder_image.jpg';
  }
}
