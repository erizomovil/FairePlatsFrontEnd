import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { RecipesListComponent } from '../recipes-list/recipes-list.component';
import { CardComponent } from '../card/card.component';
import { StaticStarsComponent } from '../static-stars/static-stars.component';
import { AddRecipeFormComponent } from '../add-recipe-form/add-recipe-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    StaticStarsComponent,
  ],
  declarations: [
    HomePage,
    RecipesListComponent,
    CardComponent,
    AddRecipeFormComponent,
  ],
})
export class HomePageModule {}
