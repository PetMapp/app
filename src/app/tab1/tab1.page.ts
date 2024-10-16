import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { PetLocationModel } from '../models/pet-location-model';
import { GooglemapService } from '../services/googlemap.service';
import { Marker } from '@capacitor/google-maps';
import { LocationService } from '../services/location.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild('map', { static: true }) mapRef!: ElementRef<HTMLElement>;
  public Load: boolean = true;
  constructor(
    private api: ApiServiceService,
    private auth: AuthService,
    private location: LocationService,
    private googlemap: GooglemapService,
    private nav: Router
  ) { }


  // Método que será chamado toda vez que a página for acessada
  async ionViewWillEnter() {
    const user = await this.auth.validateAuth();
    this.Load = true;
    if ((this.googlemap.newMap == null || this.googlemap.newMap == undefined) && user) {
      var location = await this.location.getLocation();
      await this.googlemap.createMap(location.coords.latitude, location.coords.longitude);

      //Listando todos os pets cadastrados (localizações)
      var pets = await this.api.get<PetLocationModel[]>("pet/location/all");
      if (pets != null && pets != undefined) {
        const markers: Marker[] = pets.map(element => ({
          coordinate: {
            lat: element.lat,
            lng: element.lng
          },
          iconUrl: element.petImage,
          isFlat: true,
          iconSize: {
            width: 42,
            height: 42,
          },
        }));
        await this.googlemap.SetMarkers(markers);

        await this.googlemap.SetMarkers([
          {
            coordinate: {
              lat: location.coords.latitude,
              lng: location.coords.longitude
            },
            tintColor: {
              r: 21,
              g: 154,
              b: 156,
              a: 255
            },
            title: "Você",
            isFlat: true
          }
        ])

        await this.googlemap.SetMarkerClickCallBack((d) => {
          if (pets != null && pets?.length > 0) {
            var petMarkerId = parseInt(d.markerId);
            const petItem = pets[petMarkerId];
            this.nav.navigate(["/pets/pet/details"], {
              state: {
                petId: petItem.petId
              }
            })
          }
        })

      }
      this.Load = false;
    }

  }

  async ionViewWillLeave() {
    await this.googlemap.destroyMap();
  }

  async ngOnInit() {

  }
}
