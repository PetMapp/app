import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent {

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  Logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
