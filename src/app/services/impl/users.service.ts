import { Injectable } from '@angular/core';
import { IUsersServiceDAO } from '../dao/i.users.service.dao';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TokenJWT } from 'src/app/models/tokenjwt.model';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUsersServiceDAO  {

  private resourceUrl : string;
  private headers     : HttpHeaders;

  constructor(private http: HttpClient, private sessionService : SessionService) 
  { 
    var token : TokenJWT = sessionService.getToken();
    this.resourceUrl = environment.apiUrl + "/users/";
    this.headers = new HttpHeaders({ 
                                    'Content-Type':  'application/json',
                                    'Authorization': 'Bearer ' + token.value
                                  });
  }

  create(obj: User): Observable<User> {
    return this.http.post<User>(this.resourceUrl, obj, { headers: this.headers });
  }  
  
  readById(id: number): Observable<User> {
    return this.http.get<User>(this.resourceUrl + id, { headers: this.headers });
  }

  authentication(obj: User): Observable<TokenJWT> {
    return this.http.post<TokenJWT>(this.resourceUrl + 'auth/', obj);
  }

  readAll(): Observable<User[]> {
    return this.http.get<User[]>(this.resourceUrl, { headers: this.headers });
  }

  update(obj: User): Observable<void> {
    return this.http.put<void>(this.resourceUrl + obj.id, obj, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.resourceUrl + id, { headers: this.headers });
  }

}
