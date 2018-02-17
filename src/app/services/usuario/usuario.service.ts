import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

declare var swal: any;

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];


  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = `${environment.URL_SERVICIOS}/login/renuevatoken`;
    url += '?token=' + this.token;
    return this.http.get(url)
      .map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        console.log('Token renovado');
        return true;
      })
      .catch(err => {
        this.logout();
        swal('No se pudo renovar el token', 'no fue posible renovar el token', 'error');
       return Observable.throw( err );
      });
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');

      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  crearUsuario(usuario: Usuario) {
    const url = `${environment.URL_SERVICIOS}/usuario`;
    return this.http.post(url, usuario)
      .map((res: any) => {
        swal('Usuario creado', res.usuario.email, 'success');
        return res.usuario;
      })
      .catch(err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      });

  }

  actualizarUsuario(usuario: Usuario) {

    let url = `${environment.URL_SERVICIOS}/usuario/${usuario._id}`;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
      .map((res: any) => {

        if (usuario._id === this.usuario._id) {
          const usuarioDB: Usuario = res.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      })
      .catch(err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      });

  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = `${environment.URL_SERVICIOS}/login`;
    return this.http.post(url, usuario)
      .map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario, res.menu);
        return true;
      })
      .catch(err => {
        swal('Error en el login ', err.error.mensaje, 'error');
        return Observable.throw(err);
      });
  }

  loginGoogle(token: string) {
    const url = `${environment.URL_SERVICIOS}/login/google`;
    return this.http.post(url, { token })
      .map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario, res.menu);
        return true;
      });
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }


  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  cambiarImagen(file: File, id: string) {
    this.subirArchivoService.subirArchivo(file, 'usuarios', id)
      .then((resp: any) => {
        console.log(resp);
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');

        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${environment.URL_SERVICIOS}/usuario?desde=${desde}`;

    return this.http.get(url);
  }

  buscarusuario(termino: string) {
    const url = `${environment.URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;

    return this.http.get(url)
      .map((resp: any) => {
        return resp.usuarios;
      });

  }

  borrarUsuario(id: string) {
    const url = `${environment.URL_SERVICIOS}/usuario/${id}?token=${this.token}`;
    return this.http.delete(url)
      .map(resp => {
        swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
        return true;
      });
  }

}
