import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchesService } from 'src/app/services/searches.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: Usuario[] = [];
  public usersTemp: Usuario[] = [];
  public offset: number = 0;
  public cargando: boolean = true;
  public imgSub!: Subscription;

  constructor(
    private userService: UsuarioService,
    private searchesService:SearchesService,
    private modalImageService: ModalImageService
  ) { }

  ngOnInit(): void {
   this.chargeUsers();
   this.imgSub = this.modalImageService.newImage
    .pipe(
      delay(100)
    )
   .subscribe(img => this.chargeUsers());
  }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe();
  }

  chargeUsers() {
    this.cargando = true;
    this.userService.chargeUsers(this.offset).subscribe({
      next: ({total, usuarios}) => {
        this.totalUsers = total;
        this.users = usuarios;
        this.usersTemp = usuarios;
        this.cargando = false;
      }
    });
  }

  changePage(value: number) {
    this.offset += value;
    if (this.offset < 0) {
      this.offset = 0;
    } else if (this.offset > this.totalUsers) {
      this.offset -= value;
    }
    this.chargeUsers();
  }

  search(value : string) {

    if (value.length === 0) {
     return this.users = [...this.usersTemp];
    } 
    this.searchesService.search('usuarios', value).subscribe({
      next: (value) => {
          this.users = value as Usuario[];
      },
    });
  }

  deleteUser(user: Usuario) {

    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'No puede borrarse asi mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: "Esta a punto de borrar a $ {usuario.nombre}",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.deleteUser(user).subscribe({
          next: (value) => {
            Swal.fire(
              'Usuario borrado!',
              `${user.nombre} fue borrado correctamente`,
              'success'
            );

            this.chargeUsers();

          }
        });
        
      } 
    })
  }

  changeRole(user: Usuario){
    this.userService.saveUser(user).subscribe({
      next: (value) => {
        
      }
    })
  }

  showModalImage(user: Usuario) {
    this.modalImageService.showModal('usuarios', user.uid || '', user.img);
  }
  
  

}
