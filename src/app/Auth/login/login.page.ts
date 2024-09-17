import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  senha: string = "";
  loading: boolean = false;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onRegister() {
    this.navCtrl.navigateForward("/register");
  }

  onLogin() {
    console.log({
      login: this.email,
      senha: this.senha
    });
  }

}
