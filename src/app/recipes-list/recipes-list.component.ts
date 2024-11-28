// src/app/components/recipes-list/recipes-list.component.ts
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Recipe } from '../models/recipe.models';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit {
  @Input() recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    if (this.recipes.length === 0) {
      this.fetchRecipes();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['recipes'] && changes['recipes'].currentValue) {
      this.recipes = changes['recipes'].currentValue;
    }
  }

  fetchRecipes() {
    this.recipeService.getRecipes().subscribe(
      (data) => {
        this.recipes = data;
      },
      (error) => {
        console.error('Error fetching recipes:', error);
      }
    );
  }
}
