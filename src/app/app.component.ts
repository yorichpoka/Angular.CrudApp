import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EComponent } from './models/enums/component.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isHeaderVisible : boolean;

  constructor(private titleService : Title) {}

  ngOnInit(): void {
    this.init();
  }

  init() : void {
    this.isHeaderVisible = false;
    this.titleService.setTitle('CrudApp')
  }

  onActivate(component : any) : void {
    if(component.name == EComponent.AuthComponent) {
    this.isHeaderVisible = false;
    this.titleService.setTitle('Auth - CrudApp');
    }
    else if(component.name == EComponent.UsersComponent) {
    this.isHeaderVisible = true;
    this.titleService.setTitle('User - CrudApp');
    }
  }

}
