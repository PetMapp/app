import { Component, OnInit } from '@angular/core';
import { PetsService } from 'src/app/services/pets.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
})
export class PetComponent implements OnInit {

  pets: any[] = [];

  constructor(private petsService: PetsService, private nav: NavController) {}

  ngOnInit(): void {
    this.petsService.getPets().subscribe({
      next: (pets) => {
        this.pets = pets;
      },
      error: (error) => {
        console.error("Erro ao carregar pets:", error);
      }
    });
  }

  goToDetails(petId: string) {
    this.nav.navigateForward(['pet-details'], { state: { petId } });
  }
}
