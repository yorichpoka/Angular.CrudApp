import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RolesService } from '../services/roles.service';
import { MenusService } from '../services/menus.service';
import { GroupMenusService } from '../services/groupmenus.service';
import { AuthorizationsService } from '../services/authorizations.service';
import { SessionService } from '../services/session.service';
import { UsersService } from '../services/users.service';
import { AppStartService } from '../services/appstart.service';
import { HttpInterceptorService } from '../services/httpinterceptor.service';
import { RootComponent } from '../views/_layout/root/root.component';
import { AuthComponent } from '../views/auth/auth.component';
import { UsersComponent } from '../views/sqlserverOrMysql/users/users.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DxButtonModule, DxDataGridModule, DxLoadPanelModule } from 'devextreme-angular';
import { main } from '../program';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HeaderComponent } from '../views/_layout/header/header.component';
import { FooterComponent } from '../views/_layout/footer/footer.component';
import { LoadPanelComponent } from '../views/components/load-panel/load-panel.component';
import { PopoverComponent } from '../views/components/popover/popover.component';
import { RolesComponent } from '../views/sqlserverOrMysql/roles/roles.component';
import { GroupMenusComponent } from '../views/sqlserverOrMysql/groupmenus/groupmenus.component';
import { MenusComponent } from '../views/sqlserverOrMysql/menus/menus.component';
import { AuthorizationsComponent } from '../views/sqlserverOrMysql/authorizations/authorizations.component';
import { GradesComponent } from '../views/mongodb/grades/grades.component';
import { GradesService } from '../services/mongodb/grades.service';
import { CoordinatesComponent } from '../views/mongodb/coordinates/coordinates.component';
import { CoordinatesService } from '../services/mongodb/coordinates.service';
import { AddressService } from '../services/mongodb/address.service';
import { AddressComponent } from '../views/mongodb/address/address.component';
import { WebSitesComponent } from '../views/sqlite/websites/websites.component';
import { RestaurantsService } from '../services/mongodb/restaurants.service';
import { RestaurantsComponent } from '../views/mongodb/restaurants/restaurants.component';

@NgModule({
  declarations: [
    RootComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    RolesComponent,
    GroupMenusComponent,
    MenusComponent,
    AuthorizationsComponent,
    GradesComponent,
    RestaurantsComponent,
    CoordinatesComponent,
    AddressComponent,
    WebSitesComponent,
    LoadPanelComponent,
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    // Devextreme.
    DxButtonModule,
    DxDataGridModule,
    DxLoadPanelModule,
    // ngx-bootstrap.
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    UsersService,
    RolesService,
    MenusService,
    GroupMenusService,
    AuthorizationsService,
    SessionService,
    GradesService,
    RestaurantsService,
    CoordinatesService,
    AddressService,
    AppStartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: main,
      deps: [AppStartService],
      multi: true
    }
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }