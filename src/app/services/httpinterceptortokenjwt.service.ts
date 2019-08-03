import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { TokenJWT } from '../models/tokenjwt.model';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorTokenJwtService implements HttpInterceptor {

  constructor(private sessionService: SessionService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token.
    var tokenJwt: TokenJWT = this.sessionService.getToken();
    // Update request.
    request = request.clone({
      headers: request.headers.set('Content-Type',  'application/json')
                              .set('Cache-Control', 'no-cache')
                              .set('Pragma',        'no-cache')
                              .set('Expires',       'Sat, 01 Jan 2000 00:00:00 GMT')
                              .set('Authorization', 'Bearer ' + tokenJwt.value)
    });
    // Continue event.
    return next.handle(request);
  }

}
