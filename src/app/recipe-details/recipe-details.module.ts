import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecipeDetailsPage } from './recipe-details.page';
import { RouterModule } from '@angular/router';
import { StaticStarsComponent } from '../static-stars/static-stars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StaticStarsComponent,
    RouterModule.forChild([
      {
        path: '',
        component: RecipeDetailsPage,
      },
    ]),
  ],
  declarations: [RecipeDetailsPage],
})
export class RecipeDetailsPageModule {}
