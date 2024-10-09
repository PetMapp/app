import { Injectable } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { MarkerClickCallbackData } from '@capacitor/google-maps/dist/typings/definitions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GooglemapService {
  // @ViewChild('map', { static: true }) mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap | null;

  constructor() {}

  async destroyMap() {
    if (this.newMap) {
      await this.newMap.destroy();
      this.newMap = null;
    }
  }

  async createMap() {
    var ref = document.getElementById('map');

    const isDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const mapStyles = isDarkMode
      ? this.getDarkModeStyles()
      : this.getLightModeStyles();

    this.newMap = await GoogleMap.create({
      id: 'my-app',
      apiKey: environment.apiKey,
      element: ref!,
      forceCreate: true,
      language: 'pt-BR',
      config: {
        center: {
          lat: 0,
          lng: 0,
        },
        zoom: 18,
        styles: mapStyles,
        streetViewControl: false, // Remove o controle de street view
        mapTypeControl: false, // Remove o controle de tipo de mapa
        fullscreenControl: false, // Remove o controle de tela cheia
        zoomControl: false,
        
      },
    });

    await this.newMap.enableClustering();
  }

  async setPositionCamera(lat: number, lng: number) {
    if (!this.newMap) {
      alert('Instância do mapa não gerada.');
      return;
    }

    // Verifique se o mapa está pronto
    if (this.newMap) {
      await this.newMap.setCamera({
        coordinate: {
          lat: lat,
          lng: lng,
        },
        animate: true,
      });
    }
  }

  public async SetMarkers(
    markers: Marker[],
    onClickMarker: (a: MarkerClickCallbackData) => any
  ) {
    if (this.newMap) {
      await this.newMap?.addMarkers(markers);
      await this.newMap.setOnMarkerClickListener(onClickMarker);
    }
  }

  private getLightModeStyles(): google.maps.MapTypeStyle[] {
    return [];
  }

  private getDarkModeStyles(): google.maps.MapTypeStyle[] {
    return [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#212121',
          },
        ],
      },
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575',
          },
        ],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#212121',
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            color: '#757575',
          },
        ],
      },
      {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e',
          },
        ],
      },
      {
        featureType: 'administrative.land_parcel',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#bdbdbd',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#181818',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161',
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#1b1b1b',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#2c2c2c',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#8a8a8a',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          {
            color: '#373737',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#3c3c3c',
          },
        ],
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [
          {
            color: '#4e4e4e',
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161',
          },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#3d3d3d',
          },
        ],
      },
    ];
  }
}
