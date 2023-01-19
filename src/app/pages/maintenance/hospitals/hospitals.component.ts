import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { delay, Subscription } from 'rxjs';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit , OnDestroy{

  public hospitals: Hospital[] = [];
  public charging: boolean = true;
  private imgSub!: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchesService: SearchesService
  ) { }
  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }


  ngOnInit(): void {
    this.chargeHospitals();
    this.imgSub = this.modalImageService.newImage
    .pipe(delay(100))
    .subscribe(img => this.chargeHospitals());
  }

  chargeHospitals() {
    this.charging ; true;
    this.hospitalService.chargeHospitals().subscribe(
      {
        next: (value) => {
            this.charging = false;
            this.hospitals = value;
        },
      }
    );
  }

  saveChanges(hospital: Hospital) {
    this.hospitalService.createHospital(hospital.nombre).subscribe({
      next: (value) => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
      },
    });
  }

  deleteHospital(hospital: Hospital) {
    this.hospitalService.deleteHospital(hospital._id!).subscribe({
      next: (value) => {
        this.chargeHospitals();
          Swal.fire('Borrado', hospital.nombre, 'success');
      },
    });
  }

  search(value: string) {

    if (value.length === 0) {
      this.chargeHospitals();
      return;
    }

    this.searchesService.search('hospitales', value).subscribe({
      next: (value) => {
        this.hospitals = value as Hospital[];
      }
    });
  }

  async openSweetAlert() {

    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });

    if (value && value?.trim().length > 0) {
      this.hospitalService.createHospital(value).subscribe({
        next: (resp: any) => {
            this.hospitals.push(resp.hospital);
        },
      });
    }
  }

  openModal(hospital: Hospital) {
    this.modalImageService.showModal('hospitales', hospital._id!, hospital.img);
  }

}
