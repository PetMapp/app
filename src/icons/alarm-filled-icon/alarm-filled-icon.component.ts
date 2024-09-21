import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-alarm-filled-icon',
  templateUrl: './alarm-filled-icon.component.html',
  styleUrls: ['./alarm-filled-icon.component.scss'],
})
export class AlarmFilledIconComponent {

  @Input() width: string = '26';
  @Input() height: string = '26';
  @Input() viewBox: string = '0 0 26 26';

  constructor(private themeService: ThemeService) {}

  get color(): string {
    return this.themeService.getTheme() === 'dark' ? 'white' : 'black';
  }
}
