import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { UsersService } from '../services/users.service';
import { TokenJWT } from '../models/tokenjwt.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(
    private router: Router,
    private sessionService : SessionService,
    private userService : UsersService) { }

  canActivate() : boolean {
    const canActivate : boolean = this.sessionService.getUser().id !== 0;
    
    if(!canActivate) {
      this.router.navigate(['/auth']);
    } else {
      // Update token.
      this.userService
          .authentication(this.sessionService.getUser())
          .then(
            // Success.
            (dataTokenJwt : TokenJWT) => {
              this.sessionService.setToken(dataTokenJwt);
              // Log.
              console.log('token updated');
            }
          );
    }

    return canActivate;
  }

}