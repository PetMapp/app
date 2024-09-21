import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-dog-icon',
  templateUrl: './dog-icon.component.html',
  styleUrls: ['./dog-icon.component.scss'],
})
export class DogIconComponent {
  @Input() width: string = '30';
  @Input() height: string = '30';

  constructor(private themeService: ThemeService) {}

  get strokeColor(): string {
    return this.themeService.getTheme() === 'dark' ? 'white' : 'black';
  }
}
