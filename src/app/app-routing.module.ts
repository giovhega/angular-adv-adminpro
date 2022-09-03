import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PageRoutingModule } from './pages/page-routing.module';

const routes: Routes = [
//  { path: 'dashboard', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
 // { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: '**', component: NopagefoundComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    AuthRoutingModule,
    PageRoutingModule
  ]
})

export class AppRoutingModule {

}
