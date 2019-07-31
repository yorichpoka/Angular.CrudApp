import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/impl/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(
    private router: Router,
    private sessionService : SessionService) { }

  canActivate() : boolean {
    var canActivate : boolean = this.sessionService.isExistUserConnected();

    console.warn('canActivate : ' + canActivate);

    if(!canActivate){
      this.router.navigate(['/auth']);
    }

    return canActivate;
  }

}