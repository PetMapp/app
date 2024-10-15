import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';

import { AvatarUsuarioComponent } from '../components/avatar-usuario/avatar-usuario.component';
import { ItensConfigComponent } from '../components/itens-config/itens-config.component';
import { LucideAngularModule, Palette, CircleUserRound } from 'lucide-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    LucideAngularModule.pick({ Palette, CircleUserRound })
  ],
  declarations: [
    ItensConfigComponent,
    AvatarUsuarioComponent,
    Tab4Page]
})
export class Tab4PageModule {}
