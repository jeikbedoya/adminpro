import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class VerificaTokenGuard implements CanActivate {


  constructor(
    public usuarioService: UsuarioService,
  ) { }

  canActivate(): Promise<boolean> | boolean {

    console.log('Inicio de verifica tokern guard');

    const token = this.usuarioService.token;

    const payload = JSON.parse(atob(token.split('.')[1]));

    const expirado = this.expirado(payload.exp);

    if (expirado) {
      this.usuarioService.logout();
      return false;
    }


    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExpiracion: number): Promise<boolean> {
    return new Promise( ( resolve, reject) => {

      const tokenExp = new Date(fechaExpiracion * 1000);
      const ahora = new Date();

      ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));


      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renuevaToken()
          .subscribe( () => {
            resolve(true);
          },
          () => {
            this.usuarioService.logout();
            reject(false);
          }
          );
      }

    });
  }

  expirado(fechaExpiracion: number) {

    const ahora = new Date().getTime() / 1000;

    if (fechaExpiracion < ahora) {
      return true;
    } else {
      return false;
    }

  }


}
