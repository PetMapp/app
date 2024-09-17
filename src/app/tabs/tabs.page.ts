import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  currentRoute = '';

  constructor(private router: Router) {}

  ngOnInit() {
    //obtém rota atual
    this.currentRoute = this.router.url;

    //verifica mudancas na rota
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    })
  }

  isActive(tab:string):boolean {
    //retorna verdadeiro se rota for igual com a url do tab
    return this.currentRoute.startsWith(tab);
  }

}
