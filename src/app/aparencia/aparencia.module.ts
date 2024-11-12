import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AparenciaPageRoutingModule } from './aparencia-routing.module';

import { AparenciaPage } from './aparencia.page';

import { TrocaTemaComponent } from 'src/app/components/troca-tema/troca-tema.component'; // Caminho correto

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AparenciaPageRoutingModule
  ],
  declarations: [AparenciaPage,TrocaTemaComponent]
})
export class AparenciaPageModule {}
