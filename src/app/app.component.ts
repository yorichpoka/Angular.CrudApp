import { Component, OnInit, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from './models/user.model';
import { LoadPanel } from './helpers/loadpanel.helper';
import { AuthComponent } from './views/auth/auth.component';
import { UsersComponent } from './views/users/users.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userConnected : User = new User();
  loadPanel     : LoadPanel = new LoadPanel();

  constructor(private titleService: Title) { }

  ngOnInit() { }

  onActivate(component: any): void {
    // #region AuthComponent
    if (component instanceof AuthComponent) {
      this.titleService.setTitle('Auth - CrudApp');
      // Subscribe to the emitter.
      (<EventEmitter<User>>component.eEUserConnected).subscribe(
        (dataUser : User) => {
          this.userConnected = dataUser;
        }
      );
    }
    // #endregion

    // #region UsersComponent
    else if (component instanceof UsersComponent) {
      this.titleService.setTitle('Users - CrudApp');
    }
    // #endregion
  }

}