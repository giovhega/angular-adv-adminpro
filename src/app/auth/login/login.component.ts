import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;
  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.formBuilder.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
 
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsuarioService,
    private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "562946388898-gq022a75pg36ibc7bs3cdhaucig9ieuk.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
    
  }

  handleCredentialResponse(response: any) {
    this.userService.loginGoogle(response.credential).subscribe({
      next: (value) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/');
        });
      },
      error: (error) => {
        
      }
    });
  }

  login() {

    this.userService.login(this.loginForm.value).subscribe({
      next: (value) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');
      },
      error: (error) => {
        Swal.fire('Error', error.error.msg, 'error'); 
      }
    });
  }

}
