import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './views/auth/auth.component';
import { RolesService } from './services/roles.service';
import { MenusService } from './services/menus.service';
import { GroupmenusService } from './services/groupmenus.service';
import { AuthorizationsService } from './services/authorizations.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UsersComponent } from './views/users/users.component';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { SessionService } from './services/session.service';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    // angular-font-awesome.
    AngularFontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    // Devextreme.
    DxButtonModule,
    DxDataGridModule,
    // ngx-bootstrap.
    BsDropdownModule.forRoot()
  ],
  providers: [
    UsersService,
    RolesService,
    MenusService,
    GroupmenusService,
    AuthorizationsService,
    SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
