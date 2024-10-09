import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetsPage } from './pets.page';
import { PetRegisterPage } from '../pet-register/pet-register.page';

const routes: Routes = [
  {
    path: '',
    component: PetsPage,
  },
  {
    path: "register",
    loadChildren: () => import('../pet-register/pet-register.module').then( m => m.PetRegisterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetsPageRoutingModule {}