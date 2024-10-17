import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { GooglemapService } from '../services/googlemap.service';
import { LocationService } from '../services/location.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  usuario: any;
  currentRoute = '';
  private userSubscription: Subscription = new Subscription(); // Para gerenciar a subscrição

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
      }
      
    });
    
    this.userSubscription = this.auth.getUserLogged().subscribe(usuario => {
      if (usuario) {
        this.usuario = {
          fotoURL: usuario.photoURL || 'assets/images/default-profile.png' // Define uma imagem padrão se não houver
        };
      } else {
        this.usuario = null; // Se o usuário não estiver logado
      }
    });
  }

  // Desinscreve-se do Observable quando o componente é destruído
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  
  isActive(tab: string): boolean {
    // Retorna verdadeiro se a rota atual começar com a URL do tab
    return this.currentRoute.startsWith(tab);
  }

  usuarioLogado() {
    const usuario = this.auth.getUsuarioLogado();
    return {
      fotoURL: usuario?.photoURL
    };
  }

}
