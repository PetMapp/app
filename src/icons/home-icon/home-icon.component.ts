import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home-icon',
  templateUrl: './home-icon.component.html',
  styleUrls: ['./home-icon.component.scss'],
})
export class HomeIconComponent {
  @Input() width: string = '30';
  @Input() height: string = '30';

  constructor(private themeService: ThemeService) {}

  get strokeColor(): string {
    return this.themeService.getTheme() === 'dark' ? 'white' : 'black';
  }
}
