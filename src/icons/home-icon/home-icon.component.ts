import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-icon',
  templateUrl: './home-icon.component.html',
  styleUrls: ['./home-icon.component.scss'],
})
export class HomeIconComponent {
  @Input() width: string = '30';
  @Input() height: string = '30';
  @Input() stroke: string = 'black';
}
