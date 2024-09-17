import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map', {static: true})
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;
  constructor() { }

  ngOnInit(): void {
    this.createMap();
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        // styles: [],
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }

}
