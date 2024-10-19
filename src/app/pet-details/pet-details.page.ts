import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api-service.service';
import { PetdetailDTORes } from '../interfaces/DTOs/petdetail-dto-res';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.page.html',
  styleUrls: ['./pet-details.page.scss'],
})
export class PetDetailsPage implements OnInit {
  public detail: PetdetailDTORes | null = null;
  constructor(
    private route: Router,
    private navController: NavController,
    private api: ApiServiceService
  ) { }

  async ngOnInit() {
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras) {
      var petId: string | null = navigation.extras.state!["petId"];
      if (petId != null) {
        var detail = await this.api.get<PetdetailDTORes>(`pet/find/get/${petId}`);
        console.log(detail);
        if(detail) {
          this.detail = detail;
        }
      }
    }
  }

  public async back(){
    // this.route.navigate(["/tabs/tab1"]);
    this.navController.back();
  }

}
