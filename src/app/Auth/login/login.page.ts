import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logoPath: string = '';

  email: string = "";
  senha: string = "";
  loading: boolean = false;
  loading_text: string = "";

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private api: ApiServiceService,
    private toast: ToastController,
    private theme: ThemeService
  ) { }

  ngOnInit() { 
    this.updateLogoPath();
   }

   updateLogoPath() {
    const currentTheme = this.theme.getTheme();
    this.logoPath = currentTheme === 'dark' ? 'assets/logo-dark.svg' : 'assets/logo.svg';
  }

  onRegister() {
    this.navCtrl.navigateForward("/register");
  }

  async onGoogle() {
    await this.authService.googleLogin()
      .then(async (r) => {
        if (r) {
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
      setTimeout(() => {
        this.navCtrl.navigateRoot("/tabs/tab1");
      }, 400);
    } catch (error) {
      const toast = await this.toast.create({
        message: "E-mail ou senha inválido",
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });

      await toast.present();
    }
    this.loading = false;
  }

}
