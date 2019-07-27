import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userConnected  : User;
  @Input() isVisible    : boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.init();
  }

  init() : void {
    // header.
    this.isVisible = false;
    // get User connected.
    try {
      this.userConnected = JSON.parse(
                              sessionStorage.getItem('user')
                            );
    } catch {
      this.userConnected = new User();
    }
    console.log(this.userConnected);
    // redirect when is ot connected.
    if(!this.userConnected || this.userConnected.id === 0) {
        // Redirect to main page.
        this.router.navigate(['/auth']);
    }
  }

}
