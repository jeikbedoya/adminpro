import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../modelos/hospital.model';

declare var swal: any;

@Injectable()
export class HospitalService {

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService,
  ) {}

  cargarHospitales( desde: number) {
    const url = `${environment.URL_SERVICIOS}/hospital?desde=${desde}`;
    return this.http.get(url);
  }

  borrarHospital( id: string ) {
    const url = `${environment.URL_SERVICIOS}/hospital/${id}?token=${this.usuarioService.token}`;
    return this.http.delete(url)
      .map( (resp: any) => {
        swal('Hospital eliminado', `se ha eliminado el hospital ${resp.hospital.nombre}`, 'success');
        return true;
      });
  }

 obtenerHospital( id: string ) {
    const url = `${environment.URL_SERVICIOS}/hospital/${id}`;
    return this.http.get(url)
      .map( (resp: any) => {
        return resp.hospital;
      });
  }

  crearHospital( nombre: string ) {
    const url = `${environment.URL_SERVICIOS}/hospital?token=${this.usuarioService.token}`;
    return this.http.post(url, {nombre} )
        .map( (resp: any) => {
          swal('Hospital Creado', `se ha creado el hospital ${resp.hospital.nombre}`, 'success');
          return resp.Hospital;
        });

  }

  buscarHospital( termino: string ) {
    const url = `${environment.URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;
    return this.http.get(url)
            .map((resp: any) => {
              return resp.hospitales;
            });
  }

  actualizarHospital( hospital: Hospital ) {
    const url = `${environment.URL_SERVICIOS}/hospital/${hospital._id}?token=${this.usuarioService.token}`;
    return this.http.put(url, hospital)
        .map( (resp: any) => {
          swal('Hospital actualizado', `se ha actualizado el hospital ${resp.hospital.nombre}`, 'success');
          return true;
        });
  }

}
