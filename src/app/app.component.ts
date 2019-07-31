import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EComponent } from './models/enums/component.enum';
import { User } from './models/user.model';
import { SessionService } from './services/impl/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isHeaderVisible: boolean;
  userConnected: User;

  constructor(
    private titleService: Title,
    private sessionService : SessionService) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.isHeaderVisible = false;
    this.titleService.setTitle('CrudApp');
  }

  onActivate(component: any): void {
    this.userConnected = this.sessionService.getUserConnected();
    
    if (component.name == EComponent.AuthComponent) {
      this.isHeaderVisible = false;
      this.titleService.setTitle('Auth - CrudApp');
    }
    else if (component.name == EComponent.UsersComponent) {
      this.isHeaderVisible = true;
      this.titleService.setTitle('User - CrudApp');
    }
  }

}
