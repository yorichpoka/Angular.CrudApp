import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './views/auth/auth.component';
import { UsersService } from './services/impl/users.service';
import { RolesService } from './services/impl/roles.service';
import { MenusService } from './services/impl/menus.service';
import { GroupmenusService } from './services/impl/groupmenus.service';
import { AuthorizationsService } from './services/impl/authorizations.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UsersComponent } from './views/users/users.component';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { SessionService } from './services/impl/session.service';

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
