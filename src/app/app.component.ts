import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EComponent } from './enums/component.enum';
import { User } from './models/user.model';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userConnected: User;

  constructor(
    private titleService: Title,
    private sessionService : SessionService) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.titleService.setTitle('CrudApp');
  }

  onActivate(component: any): void {
    this.userConnected = this.sessionService.getUser();
    
    if (component.name == EComponent.AuthComponent) {
      this.titleService.setTitle('Authentication - CrudApp');
    }
    else if (component.name == EComponent.UsersComponent) {
      this.titleService.setTitle('User - CrudApp');
    }
  }

}