import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = "";
  senha: string = "";
  confirmarSenha: string = "";
  loading: boolean = false;
  loading_text: string = "";

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private api: ApiServiceService,
    private toast: ToastController
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.navCtrl.navigateForward("/login");
  }

  async onRegister() {
    try {
      if (this.senha !== this.confirmarSenha) {
        this.toast.create({
          message: "As senhas não coincidem",
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        });
        return;
      } 
  
      this.loading = true;
      this.loading_text = "Registrando...";
      await this.authService.register(this.email, this.senha)
      this.loading = false;
      setTimeout(() => {
        this.navCtrl.navigateRoot("/login");
      }, 400);
    } catch (error) {
      await this.toast.create({
        message: "Login ou senha inválido",
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      })
    }
    this.loading = false;
  }

}
