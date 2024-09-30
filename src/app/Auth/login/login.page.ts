import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
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
    private afAuth: AngularFireAuth,
    private api: ApiServiceService
  ) { }

  ngOnInit() { }

  onRegister() {
    this.navCtrl.navigateForward("/register");
  }

  async onGoogle() {
    await this.authService.googleLogin()
      .then(async (r) => {
        if(r) {
          await this.api.registerHeader(r);
          await this.navCtrl.navigateRoot("/tabs/tab1");
        }
      })
  }

  async onLogin() {
    try {
      this.loading = true;
      this.loading_text = "Entrando...";
      await this.authService.login(this.email, this.senha)
      this.loading = false;
      // this.navCtrl.navigateForward("/tabs/tab1");
    } catch (error) {

    }
    this.loading = false;
  }

}
