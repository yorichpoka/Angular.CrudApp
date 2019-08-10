import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import * as Utils from 'src/app/helpers/utils.helper';
import { ETypeNotify } from '../enums/typenotify';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate {

  constructor(
    private router: Router,
    private sessionService : SessionService) { }

  canActivate() : boolean {
    const canActivate : boolean = this.sessionService.getConnexion().user.id !== 0;
    
    if(!canActivate) {
      Utils.notification('The user must be connected.', ETypeNotify.Info);
      this.router.navigate(['/auth']);
    }

    return canActivate;
  }

}