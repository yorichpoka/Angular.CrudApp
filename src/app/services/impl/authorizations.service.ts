import { Injectable } from '@angular/core';
import { Authorization } from "../../models/authorization.model";
import { IAuthorizationsServiceDAO } from '../dao/i.authorizations.service.dao';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationsService implements IAuthorizationsServiceDAO {

  private resourceUrl: string;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  create(obj: Authorization): Observable<Authorization> {
    return this.http.post<Authorization>(this.resourceUrl, obj, { headers: this.headers });
  }

  readByIdRoleAndIdMenu(idRole: number, idMenu: number): Observable<Authorization> {
    return this.http.get<Authorization>(this.resourceUrl + '/' + idRole + '/' + idMenu, { headers: this.headers });
  }

  readAll(): Observable<Authorization[]> {
    return this.http.get<Authorization[]>(this.resourceUrl, { headers: this.headers });
  }

  update(obj: Authorization): Observable<void> {
    return this.http.put<void>(this.resourceUrl + '/' + obj.idRole + '/' + obj.idMenu, obj, { headers: this.headers });
  }

  delete(idRole: number, idMenu: number): Observable<void> {
    return this.http.delete<void>(this.resourceUrl + '/' + idRole + '/' + idMenu, { headers: this.headers });
  }

}
