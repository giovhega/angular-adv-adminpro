import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  public user!: Usuario;
  
  constructor(
    private userService: UsuarioService,
    private sidebarService: SidebarService
  ) {
    this.menuItems = sidebarService.menu;
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

}
