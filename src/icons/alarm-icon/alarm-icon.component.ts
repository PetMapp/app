import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-alarm-icon',
  templateUrl: './alarm-icon.component.html',
  styleUrls: ['./alarm-icon.component.scss'],
})
export class AlarmIconComponent {
  @Input() width: string = '26';
  @Input() height: string = '26';
  @Input() viewBox: string = '0 0 26 26';

  constructor(private themeService: ThemeService) {}

  get color(): string {
    return this.themeService.getTheme() === 'dark' ? 'white' : 'black';
  }
}
