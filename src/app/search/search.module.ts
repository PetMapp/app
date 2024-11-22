import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';

import { LucideAngularModule, ArrowLeft, Cat, Frown } from 'lucide-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    LucideAngularModule.pick({ ArrowLeft, Frown })
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
