import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() image: string | null = null;

  getImageUrl(): string {
    if (!this.image) {
      return 'assets/images/placeholder_image.jpg';
    }
    if (this.image.startsWith('http') || this.image.startsWith('https')) {
      return this.image;
    }
    console.warn(
      'Formato de imagen no válido, usando imagen por defecto:',
      this.image
    );
    return 'assets/images/placeholder_image.jpg';
  }

  constructor(private router: Router) {}

  redirectToRecipeDetails() {
    this.router.navigate(['/recipe-details', this.id]);
  }
}
