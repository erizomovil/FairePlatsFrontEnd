import { Component } from '@angular/core';
import { AddRecipeFormComponent } from '../../components/add-recipe-form/add-recipe-form.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isModalOpen = false;

  constructor(private modalController: ModalController) {}

  async openModal() {
    const modal = await this.modalController.create({
      component: AddRecipeFormComponent,
    });

    modal.onDidDismiss().then((data) => {
      if (data?.data?.recipeAdded) {
        this.refreshRecipeList();
        this.isModalOpen = false;
      }
    });

    return await modal.present();
  }

  refreshRecipeList() {
    console.log('Recargar la lista de recetas');
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
