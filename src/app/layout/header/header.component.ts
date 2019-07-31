import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isVisible    : boolean;
  @Input() userConnected    : User;

  constructor(
    private router: Router,
    private sessionService : SessionService) { }

  ngOnInit() {
    this.init();
  }

  init() : void {
    // header.
    this.isVisible      = false;
    this.userConnected  = this.sessionService.getUserConnected();
  }

}