import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../app/views/auth/auth.component';
import { UsersComponent } from './views/users/users.component';


const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'auth', component: AuthComponent },
  { path: '',     redirectTo: 'auth', pathMatch: 'full' },
  { path: '**',   redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
