import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecipeService } from '../service/recipe.service';
import { AddRecipeFormComponent } from '../add-recipe-form/add-recipe-form.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() difficulty: number = 0;
  @Input() time: number = 0;

  constructor(
    private recipeService: RecipeService,
    private modalController: ModalController
  ) {}

  showButtons: boolean = false;

  showOptions(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.button-container')) {
      this.showButtons = !this.showButtons;
    }
  }

  async edit(event: Event) {
    event.stopPropagation();
    console.log('Edit clicked');

    const recipeToEdit = {
      id: this.id,
      title: this.title,
      difficulty: this.difficulty,
      time: this.time,
      image: '',
      ingredients: '',
      steps: '',
    };

    // Abre el modal con los datos de la receta
    const modal = await this.modalController.create({
      component: AddRecipeFormComponent,
      componentProps: { recipeToEdit: recipeToEdit },
    });
    modal.present();
    this.showButtons = false;
  }

  delete(event: Event) {
    event.stopPropagation();
    this.recipeService.deleteRecipe(this.id).subscribe({
      next: () => {
        console.log('Receta eliminada : ' + this.id);
      },
      error: (err) => {
        console.error('Error eliminando receta:', err);
      },
    });
  }
}
