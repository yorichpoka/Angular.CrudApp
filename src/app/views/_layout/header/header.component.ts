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

  @Input() userConnected  : User = new User();

  constructor(private router: Router) { }

  ngOnInit() { }

  disconnect() : void {
    // Redirect to auth page.
    this.router.navigate(['/auth']);
  }

  profil() : void {
    
  }

}