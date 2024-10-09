import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-itens-config',
  templateUrl: './itens-config.component.html',
  styleUrls: ['./itens-config.component.scss'],
})
export class ItensConfigComponent {
  @Input() icon: string = 'alert-outline';
  @Input() label: string = 'Configuração';
  @Input() link: string = '/';
}
