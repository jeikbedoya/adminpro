import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import {
  SidebarService,
  UsuarioService
} from '../../services/service.index';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _sidebar: SidebarService,
    public usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

}
