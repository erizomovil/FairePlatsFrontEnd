import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Recipe } from '../models/recipe.models';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.scss'],
})
export class AddRecipeFormComponent {
  recipe: Recipe = {
    title: '',
    difficulty: 1,
    time: 0,
    image: '',
    ingredients: '',
    steps: '',
  };
  isEditMode: boolean = false;
  recipeId: number | undefined = undefined;

  @Input() set recipeToEdit(recipe: Recipe | null) {
    if (recipe && recipe.id !== null) {
      this.recipe = { ...recipe };
      this.isEditMode = true;
      this.recipeId = recipe.id;
    }
  }

  @Output() recipeAdded = new EventEmitter<boolean>();

  constructor(
    private modalController: ModalController,
    private recipeService: RecipeService
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  submitRecipe() {
    if (this.recipe.title && this.recipe.difficulty && this.recipe.time) {
      if (this.isEditMode && this.recipeId !== undefined) {
        console.log('Editando receta:', this.recipe);
        this.recipeService.updateRecipe(this.recipeId, this.recipe).subscribe({
          next: (updatedRecipe) => {
            console.log('Receta actualizada', updatedRecipe);
            this.recipeAdded.emit(true);
            this.dismiss();
          },
          error: (err) => {
            console.error('Error al editar la receta:', err);
            this.recipeAdded.emit(false);
          },
        });
      } else {
        console.log('Enviando receta:', this.recipe);
        this.recipeService.addRecipe(this.recipe).subscribe({
          next: (newRecipe) => {
            this.recipeAdded.emit(true);
            this.dismiss();
          },
          error: (err) => {
            console.error('Error al añadir la receta:', err);
            this.recipeAdded.emit(false);
          },
        });
      }
    } else {
      console.error('Faltan campos requeridos.');
    }
  }
}
