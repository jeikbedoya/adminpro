import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SharedService,
  SettingsService,
  SidebarService,
} from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SharedService,
    SettingsService,
    SidebarService,
  ]
})
export class ServiceModule { }
