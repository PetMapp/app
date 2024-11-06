import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AparenciaPageRoutingModule } from './aparencia-routing.module';

import { AparenciaPage } from './aparencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AparenciaPageRoutingModule
  ],
  declarations: [AparenciaPage]
})
export class AparenciaPageModule {}
