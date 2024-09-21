import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home-filled-icon',
  templateUrl: './home-filled-icon.component.html',
  styleUrls: ['./home-filled-icon.component.scss']
})
export class HomeFilledIconComponent {
  @Input() width: string = '30';
  @Input() height: string = '30';

  constructor(private themeService: ThemeService) {}

  get fillColor(): string {
    return this.themeService.getTheme() === 'dark' ? 'white' : 'black';
  }
}
