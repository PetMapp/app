import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeFilledIconComponent } from 'src/icons/home-filled-icon/home-filled-icon.component';
import { AlarmIconComponent } from 'src/icons/alarm-icon/alarm-icon.component';
import { DogIconComponent } from 'src/icons/dog-icon/dog-icon.component';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule

  ],
  declarations: [TabsPage, HomeFilledIconComponent, AlarmIconComponent, DogIconComponent]
})
export class TabsPageModule {}
