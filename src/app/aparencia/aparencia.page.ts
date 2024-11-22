import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-aparencia',
  templateUrl: './aparencia.page.html',
  styleUrls: ['./aparencia.page.scss'],
})
export class AparenciaPage implements OnInit {

  constructor(
    private nav:NavController
  ) { }

  ngOnInit() {
  }

  toTab4() {
    this.nav.navigateBack('/tabs/tab4');
  }

}
