import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../app/views/auth/auth.component';
import { UsersComponent } from './views/users/users.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: 'auth',   component: AuthComponent },
  { path: 'users',  component: UsersComponent, canActivate: [AuthGuard] },
  { path: '',       redirectTo: 'auth', pathMatch: 'full' },
  { path: '**',     redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }