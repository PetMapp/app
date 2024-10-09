import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar-usuario',
  templateUrl: './avatar-usuario.component.html',
  styleUrls: ['./avatar-usuario.component.scss'],
})
export class AvatarUsuarioComponent {
  @Input() userName: string = 'Nome do usuário';
}
