import { Component } from '@angular/core';

@Component({
  selector: 'app-troca-tema',
  templateUrl: './troca-tema.component.html',
  styleUrls: ['./troca-tema.component.scss'],
})
export class TrocaTemaComponent {
  temaEscuro = false;

  constructor() {
    const temaSalvo = localStorage.getItem('theme');
    this.temaEscuro = temaSalvo === 'dark';
    document.body.classList.toggle('dark', this.temaEscuro);
  }

  trocarTema(event: any) {
    this.temaEscuro = event.detail.checked;
    const tema = this.temaEscuro ? 'dark' : 'light';
    document.body.classList.toggle('dark', this.temaEscuro);
    localStorage.setItem('theme', tema);
  }
}
