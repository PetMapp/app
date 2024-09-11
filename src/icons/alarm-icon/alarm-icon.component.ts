import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alarm-icon',
  templateUrl: './alarm-icon.component.html',
  styleUrls: ['./alarm-icon.component.scss'],
})

export class AlarmIconComponent {
  @Input() color: string = 'black';
  @Input() width: string = '26';
  @Input() height: string = '26';
  @Input() viewBox: string = '0 0 26 26';
}
