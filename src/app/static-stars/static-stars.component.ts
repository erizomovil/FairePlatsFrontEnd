import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-static-stars',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './static-stars.component.html',
  styleUrls: ['./static-stars.component.scss'],
})
export class StaticStarsComponent {
  @Input() rating: number = 0;

  constructor() {}
}
