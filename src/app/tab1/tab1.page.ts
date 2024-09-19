import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public userLat: number = 0;
  public userLng: number = 0;

  constructor(private auth: AuthService,
    private location: LocationService
  ) { }

  async ngOnInit() {
    var perm = await this.location.requestPermission();
    console.log(perm);
    if (perm) {
      var location = await this.location.getLocation();
      this.userLat = location.coords.latitude;
      this.userLng = location.coords.longitude;
    }
  }



}
