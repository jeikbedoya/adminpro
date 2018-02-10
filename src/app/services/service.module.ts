import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SharedService,
  SettingsService,
  SidebarService,
  UsuarioService,
  LoginguardGuard,
  SubirArchivoService
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
    LoginguardGuard,
    SubirArchivoService
  ]
})
export class ServiceModule { }
