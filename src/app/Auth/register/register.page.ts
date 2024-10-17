import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  logoPath: string = '';

  nome: string = "";
  email: string = "";
  senha: string = "";
  confirmarSenha: string = "";
  photoUrl: string = '';
  loading: boolean = false;
  loading_text: string = "";
  private avatarSubscription: Subscription | undefined; // Adicionar Subscription

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private api: ApiServiceService,
    private toast: ToastController,
    private theme: ThemeService,
    private avatar: AvatarService
  ) { }

  ngOnInit() {
    this.updateLogoPath();
    this.avatarSubscription = this.avatar.getRandomAvatar().subscribe(url => {
      this.photoUrl = url; // Atribui a URL do avatar aleatório
      console.log(this.photoUrl);
    });
  }

  ngOnDestroy() {
    // Desinscrever-se do Observable ao destruir o componente
    if (this.avatarSubscription) {
      this.avatarSubscription.unsubscribe();
    }
  }

  updateLogoPath() {
    const currentTheme = this.theme.getTheme();
    this.logoPath = currentTheme === 'dark' ? 'assets/logo-dark.svg' : 'assets/logo.svg';
  }

  onLogin() {
    this.navCtrl.navigateBack("/login");
  }

  async onRegister() {
    try {
      if (this.senha !== this.confirmarSenha) {
        const toast = await this.toast.create({
          message: "As senhas não coincidem",
          duration: 3000, 
          position: 'bottom',
          color: 'danger'
        });
        await toast.present();
        return;
      }
  
      this.loading = true;
      this.loading_text = "Registrando...";
      await this.authService.register(this.email, this.senha, this.nome, this.photoUrl);
      this.loading = false;
      setTimeout(() => {
        this.navCtrl.navigateRoot("/login");
      }, 400);
    } catch (error) {
      await this.toast.create({
        message: "E-mail ou senha inválido",
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
    }
    this.loading = false;
  }

}
