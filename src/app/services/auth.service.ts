import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app';
import { Capacitor } from '@capacitor/core'
import { firstValueFrom } from 'rxjs'; // Importa a função para converter observable em promise
import { ApiServiceService } from './api-service.service';
import { NavController } from '@ionic/angular';
import { GoogleAuth, User, } from '@codetrix-studio/capacitor-google-auth'
import { signInWithCredential, Auth, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private api: ApiServiceService,
    private nav: NavController) {
    GoogleAuth.initialize({
      clientId: "241531833745-1pqtns7494nd9bjkptmb672bcgstvsrq.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    });

    // Definindo a persistência para 'local' (mantém a sessão ativa mesmo após recarregar a página)
    // Definindo a persistência para 'SESSION' ou 'LOCAL'
    this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION) // ou SESSION
      .then(() => {
        console.log('Persistência definida com sucesso.');
      })
      .catch((error) => {
        console.error('Erro ao definir persistência:', error);
      });
  }


  async googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();

    // Verifica se a plataforma é nativa (Android ou iOS)
    if (Capacitor.isNativePlatform()) {
      try {
        // Para Android (ou dispositivos móveis)
        const user: User = await GoogleAuth.signIn();

        // Usa o token de autenticação do Google para gerar a credencial no Firebase
        const credential = firebase.auth.GoogleAuthProvider.credential(user.authentication.idToken);

        // Realiza o login no Firebase com o credential gerado
        await this.afAuth.signInWithCredential(credential);

        console.log('Login com Google no Android/iOS realizado com sucesso!');

      } catch (error) {
        console.error('Erro no login com Google no Android/iOS:', error);
      }
    } else {
      // Para Web
      try {
        // Realiza o login com Google usando o popup no navegador
        await this.afAuth.signInWithPopup(provider);
        console.log('Login com Google na Web realizado com sucesso!');
      } catch (error) {
        console.error('Erro no login com Google na Web:', error);
      }
    }
  }

  isPopupSupported(): boolean {
    // Verifica se o ambiente suporta popup (browsers desktop, por exemplo)
    return !(window.navigator.userAgent.includes('iPhone') || window.navigator.userAgent.includes('Android'));
  }

  async login(email: string, senha: string) {
    await this.afAuth.signInWithEmailAndPassword(email, senha);
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  }

  async getAuthState(): Promise<firebase.User | null> {
    var e = await this.afAuth.currentUser;
    console.log(e);
    return e;
  }

  isSessionStorageAvailable(): boolean {
    try {
      const storage = window.sessionStorage;
      const testKey = '__test__';
      storage.setItem(testKey, 'test');
      storage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }


  async validateAuth(): Promise<firebase.User | null> {
    try {
      // Usar o Observable para obter o estado de autenticação atualizado
      const user = await firstValueFrom(this.afAuth.user);

      if (user) {
        console.log('Usuário autenticado:', user);
        const idToken = await user.getIdToken();
        console.log('ID Token:', idToken);
        return user;
      } else {
        // Redireciona para login se não estiver autenticado
        this.nav.navigateRoot("/login");
        return null;
      }
    } catch (error) {
      console.error('Erro ao validar auth:', error);
      return null;
    }
  }

}
