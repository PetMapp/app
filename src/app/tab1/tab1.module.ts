import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ButtonComponent } from '../components/button/button.component';
import { HeaderComponent } from '../components/header/header.component';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { LucideAngularModule } from 'lucide-angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    LucideAngularModule
  ],
  declarations: [Tab1Page, ButtonComponent, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ButtonComponent, HeaderComponent]
})
export class Tab1PageModule {}
