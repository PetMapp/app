import { Injectable } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GooglemapService {
  // @ViewChild('map', { static: true }) mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap | null;


  constructor() { }

  async destroyMap() {
    if (this.newMap) {
      await this.newMap.destroy();
      this.newMap = null;
    }
  }


  async createMap() {
    var ref = document.getElementById("map");
    this.newMap = await GoogleMap.create({
      id: 'my-app',
      apiKey: environment.apiKey,
      element: ref!,
      config: {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 8,
        styles: []
      }
    });
  }

  async setPositionCamera(lat: number, lng: number) {
    if (!this.newMap) {
      alert("Instância do mapa não gerada.");
      return;
    }

    // Verifique se o mapa está pronto
    if (this.newMap) {
      await this.newMap.setCamera({
        coordinate: {
          lat: lat,
          lng: lng
        },
        animate: true
      });
    }
  }

}
