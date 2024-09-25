import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app';
import { firstValueFrom } from 'rxjs'; // Importa a função para converter observable em promise
import { ApiServiceService } from './api-service.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private api: ApiServiceService,
    private nav: NavController) {

      this.afAuth.setPersistence('none')
      .then(() => {
        console.log('Persistência definida para none.');
      })
      .catch((error) => {
        console.error('Erro ao definir persistência: ', error);
      });

    // // Definindo a persistência para 'local' (mantém a sessão ativa mesmo após recarregar a página)
    // this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    //   .then(() => {
    //     console.log('Persistência definida para local.');
    //   })
    //   .catch((error) => {
    //     console.error('Erro ao definir persistência: ', error);
    //     return this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    //       .then(() => {
    //         console.log('Persistência definida para SESSION.');
    //       })
    //       .catch((error) => {
    //         console.error('Erro ao definir persistência SESSION: ', error);
    //         // Se a sessão também falhar, define como 'none'
    //         return this.afAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);
    //       })
    //   });
  }

  async googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      if (this.isPopupSupported()) {
        // Tenta login com Popup
        await this.afAuth.signInWithPopup(provider);
        console.log('Login com Google realizado com sucesso usando Popup!');
      } else {
        // Se o popup não for suportado, tenta com Redirect
        //  var e = await this.afAuth.signInWithPopup(provider);
        //  await this.afAuth.getRedirectResult();
        if (this.isSessionStorageAvailable()) {
          this.afAuth.signInWithPopup(provider);
        } else {
          alert('Não é possível usar signInWithRedirect devido à indisponibilidade do sessionStorage.')
        }

      }
    } catch (error) {
      console.error('Erro no login com Google:', error);
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


  async validateAuth(): Promise<firebase.User | null | void> {
    try {
      var user = await firstValueFrom(this.afAuth.authState); // Retorna o primeiro valor do authState
      if (user) {
        var t = await user.getIdToken();
        this.api.registerHeader(t);
      } else {
        this.nav.navigateRoot("/login");
      }
    } catch (error) {
      console.error('Erro ao validar auth:', error);
      return null;
    }
  }
}
