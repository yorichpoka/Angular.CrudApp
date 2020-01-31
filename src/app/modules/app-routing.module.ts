import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '../views/auth/auth.component';
import { UsersComponent } from '../views/sqlserverOrMysql/users/users.component';
import { AuthGuard } from '../guards/auth.guard';
import { RolesComponent } from '../views/sqlserverOrMysql/roles/roles.component';
import { GroupMenusComponent } from '../views/sqlserverOrMysql/groupmenus/groupmenus.component';
import { MenusComponent } from '../views/sqlserverOrMysql/menus/menus.component';
import { AuthorizationsComponent } from '../views/sqlserverOrMysql/authorizations/authorizations.component';
import { GradesComponent } from '../views/mongodb/grades/grades.component';
import { CoordinatesComponent } from '../views/mongodb/coordinates/coordinates.component';
import { AddressComponent } from '../views/mongodb/address/address.component';
import { WebSitesComponent } from '../views/sqlite/websites/websites.component';
import { RestaurantsComponent } from '../views/mongodb/restaurants/restaurants.component';


const routes: Routes = [
  { path: 'users',                component: UsersComponent,          canActivate: [AuthGuard] },
  { path: 'roles',                component: RolesComponent,          canActivate: [AuthGuard] },
  { path: 'groupMenus',           component: GroupMenusComponent,     canActivate: [AuthGuard] },
  { path: 'menus',                component: MenusComponent,          canActivate: [AuthGuard] },
  { path: 'authorizations',       component: AuthorizationsComponent, canActivate: [AuthGuard] },

  { path: 'mongodb/grades',       component: GradesComponent,         canActivate: [AuthGuard] },
  { path: 'mongodb/restaurants',  component: RestaurantsComponent,     canActivate: [AuthGuard] },
  { path: 'mongodb/coordinates',  component: CoordinatesComponent,    canActivate: [AuthGuard] },
  { path: 'mongodb/address',      component: AddressComponent,        canActivate: [AuthGuard] },
  
  { path: 'sqlite/websites',      component: WebSitesComponent,       canActivate: [AuthGuard] },

  { path: 'auth',                 component: AuthComponent },
  { path: '',                     redirectTo: 'auth', pathMatch: 'full' },
  { path: '**',                   redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }