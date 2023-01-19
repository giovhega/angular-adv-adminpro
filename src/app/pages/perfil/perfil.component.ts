import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public profileForm!: FormGroup;
  public user!: Usuario;
  public imagenUpload!: File;
  public imagenTemp: any = '';

  constructor(
    private fb: FormBuilder,
    private userService: UsuarioService,
    private fileUploadService: FileUploadService
  ) { 
    this.user = userService.user;
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      nombre: [this.user.nombre, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });

  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        const {nombre, email} = this.profileForm.value;
        this.user.nombre = nombre;
        this.user.email = email;
        Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
      },
      error: (error) => {
        console.log(error.error.msg);
        Swal.fire('Error', error.error.msg, 'error');
      }
    });
  }

  changeImage(event: any) {
    let file = null;
    if (event.target && event?.target?.files) {
      this.imagenUpload = event?.target?.files[0]; 
      file = event?.target?.files[0]; 
    }

    if (!file ) {
      this.imagenTemp = null;
      return ;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }

  }

  uploadImage() {
    this.fileUploadService
      .updatePhoto(this.imagenUpload, 'usuarios', this.user.uid || '')
      .then(img => {
        this.user.img = img;
        Swal.fire('Guardado', 'La imagen de perfil fue actualizada', 'success');
      }).catch(error => {
        Swal.fire('Error', 'No sepudo subir la imagen', 'error');
      });

  }

}
