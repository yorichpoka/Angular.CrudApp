import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { TokenJWT } from '../models/tokenjwt.model';
import { Connexion } from '../helpers/connexion.helper';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private sessionService: SessionService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token.
    var connexion: Connexion = this.sessionService.getConnexion();
    // Update request.
    request = request.clone({
      headers: request.headers.set('Content-Type',  'application/json')
                              .set('Cache-Control', 'no-cache')
                              .set('Pragma',        'no-cache')
                              .set('Expires',       'Sat, 01 Jan 2000 00:00:00 GMT')
                              .set('Authorization', 'Bearer ' + connexion.tokenJwt.value)
    });
    // Continue event.
    return next.handle(request);
  }

}
