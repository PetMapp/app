import { Component } from '@angular/core';

@Component({
  selector: 'app-troca-tema',
  templateUrl: './troca-tema.component.html',
  styleUrls: ['./troca-tema.component.scss'],
})
export class TrocaTemaComponent {
  temaEscuro: boolean = false;

  constructor() {
    this.detectarTema();  // Detecta o tema ao iniciar o app
  }

  // Detecta o tema atual, caso seja armazenado anteriormente
  detectarTema() {
    const tema = localStorage.getItem('theme') || 'light';  // Verifica o tema no localStorage ou usa 'light' como padrão
    this.temaEscuro = tema === 'dark'; // Se o tema for 'dark', o toggle ficará marcado
    this.atualizarTema(tema);  // Aplica o tema
  }

  // Alterna entre os temas light e dark
  trocarTema(event: any) {
    const novoTema = event.detail.checked ? 'dark' : 'light'; // Se o toggle for marcado, troca para dark
    this.atualizarTema(novoTema);  // Aplica o novo tema
  }

  // Atualiza o tema no body e armazena a preferência no localStorage
  atualizarTema(tema: string) {
    if (tema === 'dark') {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
    localStorage.setItem('theme', tema);  // Salva a preferência no localStorage
  }
}
