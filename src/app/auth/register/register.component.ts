import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.formBuilder.group({
    nombre: ['Lu8ffy taro', [Validators.required, Validators.minLength(3)]],
    email: ['luffy@gmail.com', [Validators.required, Validators.email]],
    password: ['12345', Validators.required],
    password2: ['12345', Validators.required],
    terminos: [true, Validators.required],
  }, {
    validators: this.samePasswords('password', 'password2')
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsuarioService,
    private router: Router
  ) { }
  
  createUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    } 

    this.userService.createUser(this.registerForm.value).subscribe({
      next: (value) => {
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        Swal.fire('Error', error.error.msg, 'error');
      },
    });
  }

  fieldNotValid(field: string): boolean {

    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
    
  }

  passNoValid() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  acceptTerms() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  samePasswords(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({noEsIgual: true});
      }
    }
  }

}
