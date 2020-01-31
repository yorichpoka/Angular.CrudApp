import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { UsersService } from 'src/app/services/users.service';
import { DisconnectionModel } from 'src/app/models/disconnection.model';
import * as Utils from 'src/app/helpers/utils.helper';
import { ETypeNotify } from 'src/app/enums/typenotify';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() userConnected      : UserModel = new UserModel();
  title                       : string;
  @Input() menuMongoDbEnabled : string;
  @Input() menuSqLiteEnabled  : string;

  constructor(
    private router: Router, 
    private sessionService : SessionService,
    private usersService : UsersService) {
    this._registerOnHubServerEvents();
  }

  ngOnInit() {
    this.title = this.sessionService.getConnexion().appSetting.title;
  }

  disconnect() : void {
    this.usersService.disconnection(this.userConnected.id)
                    .then(
                      (value : DisconnectionModel) => {
                        // Reste user connected
                        this.userConnected = new UserModel();
                        // Redirect to auth page.
                        this.router.navigate(['/auth']);
                        // Notification
                        Utils.notification(value.message, ETypeNotify.Info, this.sessionService.getAppSetting().config.notifyDuration);
                      }
                    );
  }

  profil() : void {
    
  }

  getTitleMenuMongoDbEnabled() : string {
    return this.menuMongoDbEnabled != null  ? `(${this.menuMongoDbEnabled})`
                                            : null
  }

  getCssMenuMongoDbEnabled() : string {
    return this.menuMongoDbEnabled != null  ? `active font-weight-bold`
                                            : null
  }

  getTitleMenuSqLiteEnabled() : string {
    return this.menuSqLiteEnabled != null  ? `(${this.menuSqLiteEnabled})`
                                            : null
  }

  getCssMenuSqLiteEnabled() : string {
    return this.menuSqLiteEnabled != null  ? `active font-weight-bold`
                                            : null
  }

  /**
   * 
   */
  private _registerOnHubServerEvents() : void {
    // Event when user is disconnectedfrom api
    this.usersService.onUserDisconnected.subscribe(
      () => {
        this.disconnect();
      }
    );
    // Whe user connected is update
    this.usersService.onUserUpdated.subscribe(
      (value : UserModel) => {
        // Value in session
        var user : UserModel = this.sessionService.getUser();
        // Check if user updated is connected
        if (user.id == value.id) {
          user = value;
          // Update value en session
          this.sessionService.setUser(user);
          // Update value of user connected
          this.userConnected = user;
        }
      }
    )
  }

}