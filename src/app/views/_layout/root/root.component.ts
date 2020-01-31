import { Component, OnInit, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserModel } from '../../../models/user.model';
import { LoadPanel } from '../../../helpers/loadpanel.helper';
import { AuthComponent } from '../../auth/auth.component';
import { UsersComponent } from '../../sqlserverOrMysql/users/users.component';
import { RolesComponent } from '../../sqlserverOrMysql/roles/roles.component';
import { GroupMenusComponent } from '../../sqlserverOrMysql/groupmenus/groupmenus.component';
import { MenusComponent } from '../../sqlserverOrMysql/menus/menus.component';
import { AuthorizationsComponent } from '../../sqlserverOrMysql/authorizations/authorizations.component';
import { GradesComponent } from '../../mongodb/grades/grades.component';
import { CoordinatesComponent } from '../../mongodb/coordinates/coordinates.component';
import { AddressComponent } from '../../mongodb/address/address.component';
import { WebSitesComponent } from '../../sqlite/websites/websites.component';
import { RestaurantsComponent } from '../../mongodb/restaurants/restaurants.component';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  userConnected       : UserModel = new UserModel();
  loadPanel           : LoadPanel = new LoadPanel();
  menuMongoDbEnabled  : string = null;
  menuSqLiteEnabled   : string = null;
  
  constructor(private titleService: Title) { }

  ngOnInit() { }

  onActivate(component: any): void {
    // #region AuthComponent
    if (component instanceof AuthComponent) {
      this.titleService.setTitle('Auth - CrudApp');
      // Subscribe to the emitter.
      (<EventEmitter<UserModel>>component.onUserConnected).subscribe(
        (dataUser : UserModel) => {
          this.userConnected = dataUser;
        }
      );
      this.menuMongoDbEnabled = null;
      this.menuSqLiteEnabled = null;
    }
    // #endregion

    // #region UsersComponent
    else if (component instanceof UsersComponent) {
      this.titleService.setTitle('Users - CrudApp');
      this.menuMongoDbEnabled = null;
      this.menuSqLiteEnabled = null;
    }
    // #endregion

    // #region RolesComponent
    else if (component instanceof RolesComponent) {
      this.titleService.setTitle('Roles - CrudApp');
      this.menuMongoDbEnabled = null;
      this.menuSqLiteEnabled = null;
    }
    // #endregion

    // #region GroupMenusComponent
    else if (component instanceof GroupMenusComponent) {
      this.titleService.setTitle('GroupMenus - CrudApp');
      this.menuMongoDbEnabled = null;
      this.menuSqLiteEnabled = null;
    }
    // #endregion

    // #region MenusComponent
    else if (component instanceof MenusComponent) {
      this.titleService.setTitle('Menus - CrudApp');
      this.menuMongoDbEnabled = null;
      this.menuSqLiteEnabled = null;
    }
    // #endregion

    // #region AuthorizationsComponent
    else if (component instanceof AuthorizationsComponent) {
      this.titleService.setTitle('Authorizations - CrudApp');
      this.menuMongoDbEnabled = null;
      this.menuSqLiteEnabled = null;
    }
    // #endregion

    // #region RestaurantsComponent
    else if (component instanceof RestaurantsComponent) {
      this.titleService.setTitle('Restaurants - CrudApp');
      this.menuMongoDbEnabled = 'Restaurants';
      this.menuSqLiteEnabled = null;
    }
    // #endregion

    // #region GradesComponent
    else if (component instanceof GradesComponent) {
      this.titleService.setTitle('Grades - CrudApp');
      this.menuMongoDbEnabled = 'Grades';
      this.menuSqLiteEnabled = null;
    }
    // #endregion

    // #region CoordinatesComponent
    else if (component instanceof CoordinatesComponent) {
      this.titleService.setTitle('Coordinates - CrudApp');
      this.menuMongoDbEnabled = 'Coordinates';
      this.menuSqLiteEnabled = null;
    }
    // #endregion

    // #region AddressComponent
    else if (component instanceof AddressComponent) {
      this.titleService.setTitle('Address - CrudApp');
      this.menuMongoDbEnabled = 'Address';
      this.menuSqLiteEnabled = null;
    }
    // #endregion

    // #region WebSiteComponent
    else if (component instanceof WebSitesComponent) {
      this.titleService.setTitle('WebSites - CrudApp');
      this.menuMongoDbEnabled = null;
      this.menuSqLiteEnabled = 'WebSites';
    }
    // #endregion
  }

}