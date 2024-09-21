import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-dog-filled-icon',
  templateUrl: './dog-filled.component.html',
  styleUrls: ['./dog-filled.component.scss'],
})
export class DogFilledComponent {
  @Input() width: string = '32';
  @Input() height: string = '32';
  @Input() viewBox: string = '0 0 32 32';

  constructor(private themeService: ThemeService) {}

  get fillColor(): string {
    return this.themeService.getTheme() === 'dark' ? 'white' : 'black';
  }

  get strokeColor(): string {
    return this.themeService.getTheme() === 'dark' ? 'white' : 'black';
  }
}
