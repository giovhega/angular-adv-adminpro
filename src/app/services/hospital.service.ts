import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  chargeHospitals() {

    const url = `${ base_url }/hospitales`;
    return this.http.get<{ok: boolean, hospitales: Hospital[] }>( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, hospitales: Hospital[] } ) => resp.hospitales)
              );

  }

  createHospital(name: string) {

    const url = `${ base_url }/hospitales`;
    return this.http.post( url, {nombre:name}, this.headers );           
  }

  updateHospital(name: string, _id: string) {

    const url = `${ base_url }/hospitales/${_id}`;
    return this.http.put( url, {nombre:name}, this.headers );           
  }

  deleteHospital(_id: string) {

    const url = `${ base_url }/hospitales/${_id}`;
    return this.http.delete( url, this.headers );           
  }

}
