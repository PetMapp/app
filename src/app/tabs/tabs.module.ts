import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeFilledIconComponent } from 'src/icons/home-filled-icon/home-filled-icon.component';

import { AlarmIconComponent } from 'src/icons/alarm-icon/alarm-icon.component';
import { AlarmFilledIconComponent } from 'src/icons/alarm-filled-icon/alarm-filled-icon.component';

import { DogIconComponent } from 'src/icons/dog-icon/dog-icon.component';
import { DogFilledComponent } from 'src/icons/dog-filled/dog-filled.component';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { HomeIconComponent } from 'src/icons/home-icon/home-icon.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule

  ],
  declarations: [TabsPage, HomeIconComponent, HomeFilledIconComponent, AlarmIconComponent, AlarmFilledIconComponent, DogIconComponent, DogFilledComponent]
})

export class TabsPageModule {}
