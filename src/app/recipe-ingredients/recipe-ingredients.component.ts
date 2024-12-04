import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.models';
import { IngredientService } from '../service/ingredient.service';

@Component({
  selector: 'app-recipe-ingredients',
  standalone: true,
  templateUrl: './recipe-ingredients.component.html',
  styleUrls: ['./recipe-ingredients.component.scss'],
})
export class RecipeIngredientsComponent implements OnInit {
  @Input() ingredientIds: number[] = [];
  ingredientsData: Ingredient[] = [];
  ingredientTitles: string[] = [];

  constructor(private ingredientService: IngredientService) {}

  ngOnInit() {
    this.loadIngredientsData();
  }

  loadIngredientsData() {
    this.ingredientService.getIngredients().subscribe(
      (data: Ingredient[]) => {
        this.ingredientsData = data;
        this.updateIngredientTitles();
      },
      (error) => {
        console.error('Error fetching ingredients:', error);
      }
    );
  }

  updateIngredientTitles() {
    this.ingredientTitles = this.ingredientIds.map((id) => {
      const ingredient = this.ingredientsData.find(
        (ingredient) => ingredient.id === id
      );
      return ingredient ? ingredient.title : 'Unknown Ingredient';
    });
  }

  getIngredients(): string[] {
    return this.ingredientTitles;
  }
}
