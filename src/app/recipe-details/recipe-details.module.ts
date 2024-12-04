import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecipeDetailsPageRoutingModule } from './recipe-details-routing.module';
import { RecipeIngredientsComponent } from '../recipe-ingredients/recipe-ingredients.component';
import { StaticStarsComponent } from '../static-stars/static-stars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecipeDetailsPageRoutingModule,
    RecipeIngredientsComponent,
    StaticStarsComponent,
  ],
})
export class RecipeDetailsPageModule {}
