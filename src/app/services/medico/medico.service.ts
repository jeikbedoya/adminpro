import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../modelos/medico.model';

declare var swal: any;

@Injectable()
export class MedicoService {

  totalMedicos: number;

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService,
  ) { }

  cargarMedicos() {
    const url = `${environment.URL_SERVICIOS}/medico`;
    return this.http.get(url)
      .map( (resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      });
  }

  buscarMedicos( termino: string ) {
    const url = `${environment.URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;

    return this.http.get(url)
        .map( (resp: any) => {
          return resp.medicos;
        });

  }

  borrarMedico( id: string ) {
    let url = `${environment.URL_SERVICIOS}/medico/${id}`;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url)
        .map( resp => {
          swal('Medico eliminado', 'El medico ha sido eliminado', 'success');
          return true;
        });
  }

  guardarMedico( medico: Medico) {
     let url = `${environment.URL_SERVICIOS}/medico`;

     if ( medico._id ) {
        url += '/' + medico._id;
        url += '?token=' + this.usuarioService.token;
        return this.http.put(url, medico)
          .map( (resp: any) => {
            swal('Medico actualizado', medico.nombre, 'success');
            return resp.medico;
          });
     } else {
       // creando
      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, medico)
         .map( (resp: any) => {
           swal('Medico creado', medico.nombre, 'success');
           return resp.medico;
         });
     }
  }

  cargarMedico( id: string) {
    const url = `${environment.URL_SERVICIOS}/medico/${id}`;
    return this.http.get(url)
      .map( (resp: any) => {
        return resp.medico;
      });
  }
}
