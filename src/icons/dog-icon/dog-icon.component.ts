import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dog-icon',
  templateUrl: './dog-icon.component.html',
  styleUrls: ['./dog-icon.component.scss'],
})
export class DogIconComponent {

  @Input() color: string = 'black';
  @Input() width: string = '32';
  @Input() height: string = '32';
  @Input() viewBox: string = '0 0 32 32';

}
