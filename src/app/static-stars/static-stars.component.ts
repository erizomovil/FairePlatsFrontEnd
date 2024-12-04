import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-static-stars',
  templateUrl: './static-stars.component.html',
  styleUrls: ['./static-stars.component.scss'],
})
export class StaticStarsComponent {
  @Input() rating: number = 0;

  constructor() {}
}
