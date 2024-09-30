import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { GooglemapService } from '../services/googlemap.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  currentRoute = '';

  constructor(private router: Router,
    private auth: AuthService,
    private googleMapService: GooglemapService,
    private locationService: LocationService,
    private nav: NavController
  ) {
    this.auth.validateAuth();
  }

  async ngOnInit() {
    // Obtém a rota atual
    this.currentRoute = this.router.url;

    // Verifica mudanças na rota apenas após a navegação ser concluída
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log('Rota atual:', this.currentRoute);

        //Tratativa de renderização do mapa
        if (this.currentRoute != "/tabs/tab1") {
          this.googleMapService.destroyMap();
        } else {
          await this.googleMapService.createMap();
          var location = await this.locationService.getLocation();
          this.googleMapService.setPositionCamera(location.coords.latitude, location.coords.longitude);
        }
      }
    });


  }

  isActive(tab: string): boolean {
    // Retorna verdadeiro se a rota atual começar com a URL do tab
    return this.currentRoute.startsWith(tab);
  }

}
