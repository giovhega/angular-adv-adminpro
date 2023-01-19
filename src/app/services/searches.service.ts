import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(
    private http: HttpClient,
  ) { }

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

  private transformUsers(result: any[]): Usuario[] {
      return result.map(
        user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
      );
  }

  private transformHospitals(result: any[]): Hospital[] {

    return result;
  }

  private transformDoctors(result: any[]): Medico[] {

    return result;
  }

  search(
    type: 'usuarios' | 'medicos' | 'hospitales',
    term: string) {
    const url = `${base_url}/todo/coleccion/${type}/${term}`;
    return this.http.get<any[]>(url, this.headers)
    .pipe(
      map((resp: any) => {
        switch (type) {
          case 'usuarios':
            
            return this.transformUsers(resp.data);

          case 'hospitales':
            
            return this.transformHospitals(resp.data); 
            
          case 'medicos':
            
            return this.transformDoctors(resp.data); 
        
          default:
            return [];
        }
      })
    )
           
  }

}
