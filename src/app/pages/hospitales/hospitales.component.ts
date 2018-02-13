import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../modelos/hospital.model';
import { Usuario } from '../../modelos/usuario.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;
  desde: number = 0;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService,
  ) { }

  ngOnInit() {
      this.cargando = true;
      this.cargarHospitales();

      this.modalUploadService.notificacion
              .subscribe( (resp: any) => {
                swal('Imagen actualizada ', 'Se actualizo la imagen del hospital ' + resp.hospital.nombre, 'success');
                this.cargarHospitales();
              });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales(this.desde)
      .subscribe( (resp: any) => {
        this.hospitales = resp.hospitales;
        this.totalRegistros = resp.total;
        this.cargando = false;
      });
  }

  cambiarDesde( valor: number) {
    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros || desde < 0 ) {
      return;
    }

    this.desde = desde;
    this.cargarHospitales();

  }

  borrarhospital( hospital: Hospital ) {

    swal({
      title : '¿Estas seguro?',
      text: 'Esta a punto de borrar ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( (borrar ) =>  {

       console.log(borrar);

       if ( borrar ) {
        this.hospitalService.borrarHospital(hospital._id)
          .subscribe( (borrado: boolean) => {
            this.cargarHospitales();
          });
       }
    });

  }

  crearHospital() {

    swal('Escribe el nombre del nuevo hospital: ', {
      content: 'input',
      button: {
        text: 'Crear hospital',
        closeModal: true,
      },
    })
    .then((value) => {
        if ( !value ) {
          swal('no ingreso ningun valor');
          return;
        }

        this.hospitalService.crearHospital(value)
            .subscribe( resp => {
              this.cargarHospitales();
            });
    });
  }

  buscarHospital( termino: string ) {

    this.cargando = true;

    if ( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.hospitalService.buscarHospital(termino)
      .subscribe( (hospitales: Hospital[]) => {
          this.hospitales = hospitales;
          this.cargando = false;
      });

  }

  guardarHospital( hospital: Hospital ) {

    this.hospitalService.actualizarHospital( hospital )
        .subscribe( (actualizado: boolean) => {
          this.cargarHospitales();
        });
  }

  mostrarModal( id: string ) {
    this.modalUploadService.mostrarModal('hospitales', id);
  }

}
