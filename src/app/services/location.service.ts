import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private platform: Platform) { }

  async requestPermission() {
    if (this.platform.is('capacitor')) {
      try {
        const permission = await Geolocation.requestPermissions();
        return permission.location === 'granted';
      } catch (error) {
        console.error('Erro ao solicitar permissão de localização:', error);
        return false;
      }
    } else {
      // Para web, não há solicitação de permissão separada.
      return true;
    }
  }

  async getPermission(): Promise<boolean> {
    var status = await Geolocation.checkPermissions();
    if (status.location == 'granted') {
      return true;
    } else {
      return false;
    }
  }

  async getLocation() {
    if (this.platform.is('capacitor')) {
      return await Geolocation.getCurrentPosition({
        enableHighAccuracy: true, // Tentar obter maior precisão
      });
    } else {
      return new Promise<any>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(
            (position) => {
              if (position.coords.accuracy) {
                // Considera a localização boa se a precisão for menor que 100 metros
                console.log(position.coords)
                resolve({
                  coords: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  },
                });
              } else {
                console.log('Aguardando uma localização mais precisa...');
              }
            },
            (error) => {
              console.error('Erro ao obter localização:', error);
              reject(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0,
            }
          );
        } else {
          reject('Geolocation não suportada no navegador.');
        }
      });
    }
  }
}
