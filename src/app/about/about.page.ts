import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(
    private nav:NavController
  ) { }

  ngOnInit() {
  }

  toTab4() {
    this.nav.navigateBack('/tabs/tab4');
  }

  openLink(url: string): void {
    // Tenta abrir o link em uma nova aba ou app
    window.open(url, '_blank');
  }

}
