import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetsPage } from './pets.page';

const routes: Routes = [
  {
    path: '',
    component: PetsPage,
  },
  {
    path: "register",
    loadChildren: () => import('../pet-register/pet-register.module').then( m => m.PetRegisterPageModule)
  },
  {
    path: "pet/details",
    loadChildren: () => import('../pet-details/pet-details.module').then( m => m.PetDetailsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsPageRoutingModule {}
