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

    // Definindo a persistência para 'local' (mantém a sessão ativa mesmo após recarregar a página)
    this.afAuth.setPersistence('local')
      .then(() => {
        console.log('Persistência definida para local.');
      })
      .catch((error) => {
        console.error('Erro ao definir persistência: ', error);
      });
  }

  async googleLogin(): Promise<void> {
    try {
      var t = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      console.log('Login com Google realizado com sucesso!');
    } catch (error) {
      console.error('Erro no login com Google:', error);
    }
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
