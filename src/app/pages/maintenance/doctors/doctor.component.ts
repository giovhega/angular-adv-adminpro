import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public doctorSelected!: Medico;
  public hospitalSelected!: Hospital;

  constructor(
      private router: Router,
     private activatedRoute: ActivatedRoute,
     private fb: FormBuilder,
     private hospitalService: HospitalService,
     private doctorService: DoctorService

  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => this.chargeDoctor(id));
    this.chargeHospitals();

    this.doctorForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.doctorForm.get('hospital')?.valueChanges.subscribe({
      next: (hopitalId) => {
        this.hospitalSelected = this.hospitals.find( h => h._id ===  hopitalId)!;
      }
    });

    
  }

  chargeDoctor(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.doctorService.getById(id)
    .pipe(delay(100))  
    .subscribe({
      next: (value) => {
        if (!value) {
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }
        this.doctorSelected = value;
        this.doctorForm.setValue({nombre: value.nombre, hospital: value.hospital?._id});
      }
    });
  }

  chargeHospitals() {
    this.hospitalService.chargeHospitals().subscribe({
      next: (value) => {
        this.hospitals = value;
      }
    });
  }

  saveDoctor() {
    const name = this.doctorForm.get('nombre')?.value;
    if (this.doctorSelected) {
      
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSelected._id
      };

      this.doctorService.updateDoctor(data).subscribe({
        next: (value) => {
          Swal.fire('Actualizado', `${name} actualizado correctamente`, 'success');
        }
      });
    } else {

    this.doctorService.createDoctor(this.doctorForm.value)
        .subscribe({
          next: (resp: any) => {
            Swal.fire('Creado', `${name} creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
          }
        });
    }


  }

}
