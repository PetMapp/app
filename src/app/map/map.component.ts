import { Component, ElementRef, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  @ViewChild('map', { static: true })
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;

  @Input() userLat: number = 0;
  @Input() userLng: number = 0;

  constructor() {}

  ngOnInit(): void {
    if (this.userLat !== 0 && this.userLng !== 0) {
      this.createMap();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userLat'] || changes['userLng']) {
      if (this.newMap) {
        this.updateMapCenter();
      } else if (this.userLat !== 0 && this.userLng !== 0) {
        this.createMap();
      }
    }
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: this.userLat,
          lng: this.userLng,
        },
        zoom: 8,
      },
    });
  }

  async updateMapCenter() {
    if (this.newMap) {
      await this.newMap.setCamera({
        coordinate: {
          lat: this.userLat,
          lng: this.userLng,
        },
        zoom: 8,
        animate: true,
      });
    }
  }
}
