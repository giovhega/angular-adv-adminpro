import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public user!: Usuario;

  constructor(
    private userService: UsuarioService
  ) { 
    this.user = userService.user;
  }

  logout(): void {
    this.userService.logout();
  }

}
