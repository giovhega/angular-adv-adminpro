import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      subMenu: [
        {title: 'Main', url: '/'},
        {title: 'ProgressBar', url: 'progress'},
        {title: 'Gráficas', url: 'grafica1'},
        {title: 'Promesas', url: 'promises'}
      ]

    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      subMenu: [
        {title: 'Usuarios', url: 'usuarios'},
        {title: 'Hospitales', url: 'hospitales'},
        {title: 'Médicos', url: 'medicos'},
      ]

    }
  ];

  constructor() { }
}
