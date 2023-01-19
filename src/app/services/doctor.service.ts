import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  constructor(
    private http: HttpClient
  ) { }

  chargeDoctors() {
    return this.http.get<{ok: boolean , medicos: Medico[]}>(`${base_url}/medicos`)
      .pipe(
        map((resp: {ok: boolean , medicos: Medico[]}) => resp.medicos)
      );
  }

  getById(id: string) {
    return this.http.get<{ok: boolean , medicos: Medico}>(`${base_url}/medicos/${id}`, this.headers)
      .pipe(
        map((resp: {ok: boolean , medicos: Medico}) => resp.medicos)
      );
  }

  createDoctor(medico: {nombre: string, hospital: string}) {

    const url = `${ base_url }/medicos`;
    return this.http.post( url, {...medico}, this.headers );           
  }

  updateDoctor(medico: Medico) {

    const url = `${ base_url }/medicos/${medico._id}`;
    return this.http.put( url, {...medico}, this.headers );           
  }

  deleteDoctor(_id: string) {

    const url = `${ base_url }/medicos/${_id}`;
    return this.http.delete( url, this.headers );           
  }


}
