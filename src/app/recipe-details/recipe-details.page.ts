import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../service/recipe.service';
import { IngredientsRecipesService } from '../service/relation.service';
import { IngredientService } from '../service/ingredient.service';
import { Recipe } from '../models/recipe.models';
import { Ingredient } from '../models/ingredient.models';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
  recipe!: Recipe;
  ingredients: Ingredient[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private ingredientService: IngredientService,
    private ingredientsRecipesService: IngredientsRecipesService
  ) {}

  ngOnInit() {
    const recipeId = Number(this.route.snapshot.paramMap.get('id'));

    this.recipeService.getRecipe(recipeId).subscribe({
      next: (recipe) => {
        console.log('Recipe loaded:', recipe);
        this.recipe = recipe;
        this.loadIngredients(recipeId);
      },
      error: (err) => {
        console.error('Error loading recipe', err);
        this.isLoading = false;
      },
    });
  }

  private loadIngredients(recipeId: number) {
    console.log('Loading ingredients for recipe:', recipeId);

    this.ingredientsRecipesService.getAllIngredientsRecipes().subscribe({
      next: (relations) => {
        console.log('Relations loaded:', relations);
        const ingredientIds = relations
          .filter((relation) => relation.recipe.id === recipeId)
          .map((relation) => relation.ingredient.id);

        console.log('Filtered Ingredient IDs:', ingredientIds);

        if (ingredientIds.length === 0) {
          console.log('No ingredients found for this recipe');
          this.isLoading = false;
          return;
        }

        this.ingredientService.getIngredients().subscribe({
          next: (ingredients) => {
            console.log('Ingredients loaded:', ingredients);
            this.ingredients = ingredients.filter((ingredient) =>
              ingredientIds.includes(ingredient.id)
            );

            console.log('Filtered Ingredients:', this.ingredients);
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
}
