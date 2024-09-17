import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dog-filled-icon',
  templateUrl: './dog-filled.component.html',
  styleUrls: ['./dog-filled.component.scss'],
})
export class DogFilledComponent {

  @Input() color: string = 'black';
  @Input() width: string = '32';
  @Input() height: string = '32';
  @Input() viewBox: string = '0 0 32 32';

}
