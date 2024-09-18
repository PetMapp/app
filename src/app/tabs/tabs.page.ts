import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  currentRoute = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtém a rota atual
    this.currentRoute = this.router.url;

    // Verifica mudanças na rota apenas após a navegação ser concluída
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log('Rota atual:', this.currentRoute);
      }
    });
  }

  isActive(tab: string): boolean {
    // Retorna verdadeiro se a rota atual começar com a URL do tab
    return this.currentRoute.startsWith(tab);
  }

}
