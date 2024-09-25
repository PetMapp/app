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

  ngOnInit() {
    this.afAuth.getRedirectResult()
      .then(result => {
        if (result.user) {
          console.log('Login com redirecionamento bem-sucedido:', result.user);
          this.navCtrl.navigateForward("/tabs/tab1")
          // Navegue para a página principal ou atualize o estado do usuário
        }
      })
      .catch(error => {
        console.error('Erro ao obter resultado do redirecionamento:', error);
      });
  }

  onRegister() {
    this.navCtrl.navigateForward("/register");
  }

  async onGoogle(){
    await this.authService.googleLogin();
    this.navCtrl.navigateForward("/tabs/tab1");
  }

  async onLogin() {
      try {
        this.loading = true;
        this.loading_text = "Entrando...";
        await this.authService.login(this.email, this.senha);
        this.navCtrl.navigateForward("/tabs/tab1");
        this.loading = false;
      } catch (error) {
        
      }
      this.loading = false;
  }

}
