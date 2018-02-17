import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


import {
  SharedService,
  SettingsService,
  SidebarService,
  UsuarioService,
  LoginguardGuard,
  SubirArchivoService,
  HospitalService,
  MedicoService,
  AdminGuard,
  VerificaTokenGuard
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SharedService,
    SettingsService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    LoginguardGuard,
    AdminGuard,
    VerificaTokenGuard
  ]
})
export class ServiceModule { }
