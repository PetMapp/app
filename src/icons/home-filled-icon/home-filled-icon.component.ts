import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-filled-icon',
  templateUrl: './home-filled-icon.component.html',
  styleUrls: ['./home-filled-icon.component.scss']
})
export class HomeFilledIconComponent {
  @Input() color: string = 'black';
  @Input() width: string = '30';
  @Input() height: string = '30';
  @Input() viewBox: string = '0 0 30 30'; // Adicione a propriedade viewBox
}
