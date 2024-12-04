import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../models/recipe.models';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit, OnDestroy {
  public recipe: Recipe | undefined;
  public isPortrait: boolean = window.innerHeight > window.innerWidth;
  public imageError: boolean = false;
  private id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRecipeData();

    window.addEventListener('resize', this.updateOrientation);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateOrientation);
  }

  private updateOrientation = () => {
    this.isPortrait = window.innerHeight > window.innerWidth;
  };

  private loadRecipeData() {
    if (this.id) {
      this.recipeService.getRecipe(this.id).subscribe(
        (recipe: Recipe) => {
          this.recipe = recipe;
        },
        (error) => {
          console.error('Error al cargar la receta:', error);
        }
      );
    }
  }

  handleNavigationHome() {
    this.router.navigate(['/home']);
  }

  handleNavigationNext() {
    if (this.recipe?.steps && this.recipe.steps.length > 0) {
      if (!this.isPortrait) {
        this.router.navigate([`/recipe-step/${this.id}`]);
      } else {
        this.router.navigate([`/rotate-phone/${this.id}`]);
      }
    }
  }

  handleImageError() {
    this.imageError = true;
  }

  get isButtonDisabled() {
    return true;
  }
}
