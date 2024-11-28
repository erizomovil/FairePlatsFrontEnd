import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-static-stars',
  templateUrl: './static-stars.component.html',
  styleUrls: ['./static-stars.component.scss'],
})
export class StaticStarsComponent {
  @Input() rating: number = 0;

  constructor() {}
}
