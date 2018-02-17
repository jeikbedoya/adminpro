import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTES } from './app.route';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//services
import { ServiceModule } from './services/service.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';
;


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ServiceModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
