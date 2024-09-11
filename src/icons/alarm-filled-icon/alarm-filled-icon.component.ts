import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alarm-filled-icon',
  templateUrl: './alarm-filled-icon.component.html',
  styleUrls: ['./alarm-filled-icon.component.scss'],
})
export class AlarmFilledIconComponent {

  @Input() color: string = 'black';
  @Input() width: string = '32';
  @Input() height: string = '32';
  @Input() viewBox: string = '0 0 32 32';

}
