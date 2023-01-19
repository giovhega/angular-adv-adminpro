import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UsuarioService,
    private router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
     
    return this.userService.validateToken()
                .pipe(
                  tap(isAuthenticated => {
                    if (!isAuthenticated) {
                      this.router.navigateByUrl('/login');
                    }
                  })
                );

  
  }
  
}
