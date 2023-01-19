import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, pipe, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit , OnDestroy{

  public doctors: Medico[] =  [];
  public charging: boolean = true; 
  public imgSubs!: Subscription;
  constructor(
    private doctorService: DoctorService,
    private modalImage: ModalImageService,
    private searchesService: SearchesService,

  ) { }
  

  ngOnInit(): void {
    this.imgSubs = this.modalImage.newImage
    .pipe(
      delay(100)
    )
    .subscribe(img => this.chargeDoctors());
    this.chargeDoctors();
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  chargeDoctors() {
    this.charging = true;
    this.doctorService.chargeDoctors().subscribe({
      next: (value) =>  {
        this.charging = false;
          this.doctors = value;
      },
    });
  }


  deleteDoctor(medico: Medico) {

    Swal.fire({
      title: '¿Borrar médico?',
      text: "Esta a punto de borrar a $ {usuario.nombre}",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.doctorService.deleteDoctor(medico._id!).subscribe({
          next: (value) => {
            this.chargeDoctors();
              Swal.fire('Borrado',`${medico.nombre} ha sido eliminado`, 'success');
          },
        });
        
      } 
    })

    
  }

  search(value: string) {

    if (value.length === 0) {
      this.chargeDoctors();
      return;
    }

    this.searchesService.search('medicos', value).subscribe({
      next: (value) => {
        this.doctors = value as Medico[];
      }
    });
  }



  openModal(medico: Medico) {

    this.modalImage.showModal('medicos', medico._id!, medico.img);
  }

}
