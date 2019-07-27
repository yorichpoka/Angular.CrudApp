import { Injectable } from '@angular/core';
import { IRolesServiceDAO } from '../dao/i.roles.service.dao';
import { Role } from "../../models/role.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TokenJWT } from 'src/app/models/tokenjwt.model';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService implements IRolesServiceDAO {

  private resourceUrl : string;
  private headers     : HttpHeaders;

  constructor(private http: HttpClient, private sessionService : SessionService) 
  { 
    var token : TokenJWT = sessionService.getToken();
    this.resourceUrl = environment.apiUrl + "/Roles/";
    this.headers = new HttpHeaders({ 
                                    'Content-Type':  'application/json',
                                    'Authorization': 'Bearer ' + token.value
                                  });
  }

  create(obj: Role): Observable<Role> {
    return this.http.post<Role>(this.resourceUrl, obj, { headers: this.headers });
  }  
  
  readById(id: number): Observable<Role> {
    return this.http.get<Role>(this.resourceUrl + id, { headers: this.headers });
  }

  readAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.resourceUrl, { headers: this.headers });
  }

  update(obj: Role): Observable<void> {
    return this.http.put<void>(this.resourceUrl + obj.id, obj, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.resourceUrl + id, { headers: this.headers });
  }

}
