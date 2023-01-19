import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, pipe, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChargeUser } from '../interfaces/charge-users.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public user!: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }
  

  logout() {
    localStorage.removeItem('token');

    google.accounts.id.revoke('gio19gar@gmail.com', () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    })
  }

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

  get uid(): string {
    return this.user.uid || '';
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const {email, nombre, google, role, img = '', uid} = resp.usuario;
        this.user = new Usuario(nombre, email, '', role, google, img, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData)
                .pipe(
                  tap((resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );
  }

  updateProfile(data: {email: string, nombre: string, role?: string}) {

    data = {
      ...data,
      role: this.user.role
    };

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);
  }

  login(data: LoginForm) {
    return this.http.post(`${base_url}/login`, data)
                .pipe(
                  tap((resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, {token})
                .pipe(
                  tap((resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );
  }

  chargeUsers(desde: number = 0) {
    const url = `${base_url}/usuarios/?desde=${ desde }`;
    return this.http.get<ChargeUser>(url, this.headers)
            .pipe(
              map(resp => {
                const usuarios = resp.usuarios.map(
                  user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
                );
                return {
                  total: resp.total,
                  usuarios 
                };
              })
            );
  }

  deleteUser(usuario: Usuario) {
    return this.http.delete(`${base_url}/usuarios/${usuario.uid}`, this.headers);
  }

  saveUser(data: Usuario) {

    return this.http.put(`${base_url}/usuarios/${data.uid}`, data, this.headers);
  }


}
