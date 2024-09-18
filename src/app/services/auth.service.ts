import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from 'firebase/compat/app';
import { ApiServiceService } from '../services/api-service.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private apiService: ApiServiceService) { }

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
}
