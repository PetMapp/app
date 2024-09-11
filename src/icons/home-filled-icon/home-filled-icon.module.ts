import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeFilledIconComponent } from './home-filled-icon.component';

@NgModule({
  declarations: [HomeFilledIconComponent],
  imports: [CommonModule],
  exports: [HomeFilledIconComponent] // Certifique-se de exportar o componente
})
export class HomeFilledIconModule {}
