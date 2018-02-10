import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


import swal from 'sweetalert';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;


  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');

      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
       this.token = '';
       this.usuario = null;
    }
  }

  crearUsuario( usuario: Usuario ) {
    const url = `${environment.URL_SERVICIOS}/usuario`;
    return this.http.post(url, usuario )
      .map( (res: any) => {
        swal('Usuario creado', res.usuario.email, 'success');
        return res.usuario;
      });
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = `${environment.URL_SERVICIOS}/login`;
    return this.http.post(url, usuario)
      .map( (res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario);
        return true;
      });
  }

  loginGoogle( token: string ) {
    const url = `${environment.URL_SERVICIOS}/login/google`;
    return this.http.post(url, { token })
      .map( (res: any) => {
       this.guardarStorage(res.id, res.token, res.usuario);
        return true;
      });
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  estaLogueado() {
    return  this.token.length > 5 ? true : false ;
  }

}
