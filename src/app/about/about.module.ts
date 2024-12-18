import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';

import { AboutPage } from './about.page';

import { LucideAngularModule, ArrowLeft, Github, Linkedin } from 'lucide-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule,
    LucideAngularModule.pick({ ArrowLeft, Github, Linkedin })
  ],
  declarations: [AboutPage]
})
export class AboutPageModule {}
