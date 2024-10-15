import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Search } from 'lucide-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  searchIcon = Search; 

  constructor(private nav: NavController) { }

  ngOnInit() {}

  toSearch() {
    this.nav.navigateForward('/search');
  }
}
