import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsersComponent } from './maintenance/users/users.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' }},
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes' }},
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' }},
      { path: 'promises', component: PromesasComponent, data: { titulo: 'Promesas' }},
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},

      //Mantenimientos
      { path: 'usuarios', component: UsersComponent, data: { titulo: 'Usuarios de aplicación' }},
      { path: 'hospitales', component: HospitalsComponent, data: { titulo: 'Hospitales de aplicación' }},
      { path: 'medicos', component: DoctorsComponent, data: { titulo: 'Medicos de aplicación' }},
      { path: 'medico/:id', component: DoctorComponent, data: { titulo: 'Medico de aplicación' }},
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class PageRoutingModule {

}
