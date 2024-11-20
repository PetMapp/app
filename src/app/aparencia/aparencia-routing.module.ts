import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AparenciaPage } from './aparencia.page';

const routes: Routes = [
  {
    path: '',
    component: AparenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AparenciaPageRoutingModule {}
