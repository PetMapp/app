import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  senha: string = "";
  loading: boolean = false;
  loading_text: string = "";

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {}

  onRegister() {
    this.navCtrl.navigateForward("/register");
  }

  async onGoogle() {
    await this.authService.googleLogin();
    await this.navCtrl.navigateRoot("/tabs/tab1");

  }

  async onLogin() {
    try {
      this.loading = true;
      this.loading_text = "Entrando...";
      await this.authService.login(this.email, this.senha);
      this.loading = false;
      this.navCtrl.navigateForward("/tabs/tab1");
    } catch (error) {

    }
    this.loading = false;
  }

}
