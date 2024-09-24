import { Component, ElementRef, OnInit, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';
import { GooglemapService } from '../services/googlemap.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild('map', { static: true }) mapRef!: ElementRef<HTMLElement>;
  public userLat: number = 0;
  public userLng: number = 0;

  constructor(
    private auth: AuthService,
    private location: LocationService,
    private googleMapService: GooglemapService
  ) { }

  async ngOnInit() {
    const perm = await this.location.requestPermission();
    if (perm) {
      const location = await this.location.getLocation();
      this.userLat = location.coords.latitude;
      this.userLng = location.coords.longitude;
    }
    await this.googleMapService.createMap();
  }

}
