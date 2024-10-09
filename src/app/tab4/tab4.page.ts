import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  usuarioLogado: any = null;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {
   }

  ngOnInit() {
    this.loadUsuarioLogado();
  }

  loadUsuarioLogado () {
    const user = this.authService.getUsuarioLogado();

    if (user) {
      this.usuarioLogado = user; 
    } else {
      this.navCtrl.navigateRoot('/login');
    }
  }

}
