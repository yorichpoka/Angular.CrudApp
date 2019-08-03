import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RolesService } from './services/roles.service';
import { MenusService } from './services/menus.service';
import { GroupmenusService } from './services/groupmenus.service';
import { AuthorizationsService } from './services/authorizations.service';
import { SessionService } from './services/session.service';
import { UsersService } from './services/users.service';
import { AppStartService } from './services/appstart.service';
import { HttpInterceptorTokenJwtService } from './services/httpinterceptortokenjwt.service';
import { AppComponent } from './app.component';
import { AuthComponent } from './views/auth/auth.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { UsersComponent } from './views/users/users.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DxButtonModule, DxDataGridModule, DxLoadPanelModule } from 'devextreme-angular';
import { LoadPanelComponent } from './components/load-panel/load-panel.component';
import { PopoverComponent } from './components/popover/popover.component';
import { main } from './program';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    LoadPanelComponent,
    PopoverComponent
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
    DxLoadPanelModule,
    // ngx-bootstrap.
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    UsersService,
    RolesService,
    MenusService,
    GroupmenusService,
    AuthorizationsService,
    SessionService,
    AppStartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorTokenJwtService,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: main,
      deps: [AppStartService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }