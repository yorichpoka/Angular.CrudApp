import { Component, OnInit, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EComponent } from './enums/component.enum';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userConnected: User = new User();

  constructor(private titleService: Title) { }

  ngOnInit() { }

  onActivate(component: any): void {
    // #region AuthComponent
    if (component.name == EComponent.AuthComponent) {
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
    else if (component.name == EComponent.UsersComponent) {
      this.titleService.setTitle('Users - CrudApp');
    }
    // #endregion
  }

}