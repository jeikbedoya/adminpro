import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginguardGuard implements CanActivate {


  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate() {

    if ( this.usuarioService.estaLogueado() ) {
      console.log('Paso El guard');
      return true;
    } else {
      console.log('Bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
