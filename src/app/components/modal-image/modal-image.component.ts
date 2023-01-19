import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  public user!: Usuario;
  public imagenUpload!: File;
  public imagenTemp: any = '';

  constructor(
    public modalImageService: ModalImageService,
    public fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imagenTemp = null;
    this.modalImageService.closeModal();
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

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService
      .updatePhoto(this.imagenUpload, type, id|| '')
      .then(img => {
        Swal.fire('Guardado', 'La imagen del usuario fue actualizada', 'success');
        this.modalImageService.newImage.emit(img);
        this.closeModal();
      }).catch(error => {
        console.log(error);
        Swal.fire('Error', 'No sepudo subir la imagen', 'error');
      });

  }

}
