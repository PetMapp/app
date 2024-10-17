import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Search } from 'lucide-angular';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logoPath: string = '';

  searchIcon = Search; 

  constructor(
    private nav: NavController,
    private theme: ThemeService
  ) { }

  ngOnInit() {
    this.updateLogoPath();
  }

  updateLogoPath() {
    const currentTheme = this.theme.getTheme();
    this.logoPath = currentTheme === 'dark' ? 'assets/logo-opacity-dark.svg' : 'assets/logo-opacity.svg';
  }

  toSearch() {
    this.nav.navigateForward('/search');
  }
}
