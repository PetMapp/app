import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-avatar-usuario',
  templateUrl: './avatar-usuario.component.html',
  styleUrls: ['./avatar-usuario.component.scss'],
})
export class AvatarUsuarioComponent implements OnInit {
  @Input() userName: string = 'Nome do usuário';

  usuario: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.usuario = this.usuarioLogado();
  }

  usuarioLogado() {
    const usuario = this.authService.getUsuarioLogado();
    
    return {
      displayName: usuario?.displayName || this.userName,
      fotoURL: usuario?.photoURL || 'url_da_foto_padrao'
    };
  }
}
