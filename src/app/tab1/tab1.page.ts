import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { PetLocationModel } from '../models/pet-location-model';
import { GooglemapService } from '../services/googlemap.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild('map', { static: true }) mapRef!: ElementRef<HTMLElement>;
  constructor(
    private api: ApiServiceService,
    private googlemap: GooglemapService
  ) { }

  async ngOnInit() {
    var pets = await this.api.get<PetLocationModel>("pet/location/all");
    console.log({pets});
  }
}
