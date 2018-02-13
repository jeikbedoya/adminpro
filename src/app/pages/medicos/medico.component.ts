import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../modelos/hospital.model';
import { HospitalService, MedicoService } from '../../services/service.index';
import { Medico } from '../../modelos/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public hospitalService: HospitalService,
    public medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
   }

  ngOnInit() {
    this.hospitalService.cargarHospitales(0)
      .subscribe( (resp: any) => this.hospitales = resp.hospitales);

      this.modalUploadService.notificacion
          .subscribe( resp => {
            this.medico.img = resp.medico.img;
          });
  }

  guardarMedico( forma: NgForm ) {
      if ( forma.valid ) {
        this.medicoService.guardarMedico(this.medico)
            .subscribe( medico => {
            this.medico = medico;
             this.router.navigate(['/medicos', medico._id]);
            });
      }
  }

  cargarMedico( id: string ) {
    this.medicoService.cargarMedico(id)
        .subscribe( medico => {
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambioHospital( this.medico.hospital );
        });
  }

  cambioHospital( id: string ) {

    this.hospitalService.obtenerHospital(id)
        .subscribe( hospital => {
          this.hospital = hospital;
        });
  }

  cambiarFoto() {

    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
