import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers();
   /*  const promesa = new Promise(( resolve, reject ) => {

      if (false) {
        resolve('Hola mundo');
      } else {
        reject('Error reject');
      }

    });

    promesa.then( () => {
      console.log('hey termine');
    }).catch(error => console.log('ALgo salio mal en lapromesa ', error));

    console.log('Fin del init');*/
  }

  getUsers() {
     fetch('https://regres.in/api/users')
      .then(resp => {
        resp.json().then(body => console.log('tengo data'));
      });
  }

}
