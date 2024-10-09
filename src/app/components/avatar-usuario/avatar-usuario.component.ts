import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-avatar-usuario',
  templateUrl: './avatar-usuario.component.html',
  styleUrls: ['./avatar-usuario.component.scss'],
})
export class AvatarUsuarioComponent {
  @Input() userName: string = 'Nome do usuário';

  constructor(
    private authService: AuthService
  ) { }

  usuarioLogado() {
    const usuario = this.authService.getUsuarioLogado();
    return usuario ? usuario.displayName : this.userName;

  }

}

