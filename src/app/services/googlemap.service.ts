import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GooglemapService {
  // @ViewChild('map', { static: true }) mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap | null;
  public userLat: number = 0;
  public userLng: number = 0;

  constructor() {

  }

  async destroyMap() {
    if (this.newMap) {
      this.newMap.destroy();
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
          lat: this.userLat,
          lng: this.userLng
        },
        zoom: 8,
        styles: []
      }
    });
  }
}
