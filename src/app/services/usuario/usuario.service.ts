import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

declare var swal: any;

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;


  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoService: SubirArchivoService
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

  actualizarUsuario( usuario: Usuario ) {

    let url = `${environment.URL_SERVICIOS}/usuario/${usuario._id}`;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
        .map( (res: any) => {

          if ( usuario._id === this.usuario._id) {
            const usuarioDB: Usuario = res.usuario;
            this.guardarStorage( usuarioDB._id, this.token, usuarioDB);
          }
          swal('Usuario actualizado', usuario.nombre, 'success');
          return true;
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

  cambiarImagen( file: File, id: string ) {
    this.subirArchivoService.subirArchivo( file, 'usuarios', id )
      .then( (resp: any) => {
        console.log(resp);
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');

        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch( resp => {
        console.log(resp);
      });
  }

  cargarUsuarios( desde: number = 0) {
    const url = `${environment.URL_SERVICIOS}/usuario?desde=${desde}`;

    return this.http.get( url );
  }

  buscarusuario( termino: string ) {
    const url = `${environment.URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`;

    return this.http.get(url)
        .map( (resp: any) => {
          return resp.usuarios;
        });

  }

  borrarUsuario( id: string) {
    const url = `${environment.URL_SERVICIOS}/usuario/${id}?token=${this.token}`;
    return this.http.delete(url)
        .map( resp => {
          swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
          return true;
        });
  }

}
