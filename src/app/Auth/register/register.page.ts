import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';
import { AvatarService } from 'src/app/services/avatar.service';
import { Subscription } from 'rxjs';
import { FirebaseError } from 'firebase/app';

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
    // Checa se senhas são iguais
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

    // Checa tamanho da senha
    if (this.senha.length < 6) {
      const toast = await this.toast.create({
        message: "A senha deve ter pelo menos 6 caracteres.",
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
      return;
    }

    try {
      this.loading = true;
      this.loading_text = "Registrando...";

      await this.authService.register(this.email, this.senha, this.nome, this.photoUrl);

      this.loading = false;

      const toast = await this.toast.create({
        message: 'Registro feito com sucesso.',
        duration: 3000,
        position: 'bottom',
        color: 'success'
      });

      await toast.present();

      setTimeout(() => {
        this.navCtrl.navigateRoot("/login");
      }, 400);

    } catch (error) {
      console.error('Erro ao registrar:', error); // Loga o erro no console

      let errorMessage = "Ocorreu um erro ao registrar.";
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = "Formato de email inválido.";
            break;
          case 'auth/email-already-in-use':
            errorMessage = "Este email já está em uso.";
            break;
          default:
            errorMessage = "Erro desconhecido. Tente novamente.";
        }
      }

      const toast = await this.toast.create({
        message: errorMessage,
        duration: 3000,
        position: 'bottom',
        color: 'danger'
      });

      await toast.present();
    } finally {
      this.loading = false; // Garante que o loading será definido como false
    }
  }


}
