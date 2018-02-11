import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../modelos/usuario.model';
declare var  swal: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public usuarioService: UsuarioService
  ) {
    this.usuario = this.usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario: Usuario) {

   this.usuario.nombre = usuario.nombre;
   this.usuario.email = usuario.email;
   this.usuarioService.actualizarUsuario(this.usuario)
      .subscribe();
  }

  selecccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    console.log(archivo);

    if ( archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlimagenTemp  = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {

    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id );

  }

}
