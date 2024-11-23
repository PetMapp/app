import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-troca-tema',
  templateUrl: './troca-tema.component.html',
  styleUrls: ['./troca-tema.component.scss'],
})
export class TrocaTemaComponent {
  temaEscuro: boolean = false;

  constructor(private themeService: ThemeService) {
    this.detectarTema(); // Inicializa o estado com o tema atual
  }

  detectarTema() {
    const temaAtual = this.themeService.getTheme(); // Obtém o tema do ThemeService
    this.temaEscuro = temaAtual === 'dark';
  }

  trocarTema(event: any) {
    const novoTema = event.detail.checked ? 'dark' : 'light';
    this.themeService.setTheme(novoTema); // Atualiza o tema no ThemeService
    this.temaEscuro = novoTema === 'dark'; // Atualiza o estado local
  }
}
