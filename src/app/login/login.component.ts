import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../modelos/usuario.model';

declare var init_plugins;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls : ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;


  auth2: any;

  constructor(
    public router: Router,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    this.recuerdame = this.email.length > 0;
    }

    googleInit() {
      gapi.load('auth2', () => {
          this.auth2 = gapi.auth2.init({
            cliente_id: '478316415802-9q0ctrf97kh5vr80h0hn07576iaf5vkb.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            scope: 'profile email',
          });

        this.attachSigin( document.getElementById('btnGoogle') );

      });
    }

    attachSigin( element) {
      this.auth2.attachClickHandler( element, {}, (googleUSer) => {

       //const profile = googleUSer.getBasicProfile();
       const token = googleUSer.getAuthResponse().id_token;

       this.usuarioService.loginGoogle(token)
          .subscribe( (res) => {
            window.location.href = '#/dashboard';
          });

        console.log(token);
      });
    }


  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

  const usuario = new Usuario(null, forma.value.email, forma.value.password );

  this.usuarioService.login( usuario, forma.value.recuerdame)
    .subscribe(
      () => {
        window.location.href = '#/dashboard';
      }
    );
  }

}
