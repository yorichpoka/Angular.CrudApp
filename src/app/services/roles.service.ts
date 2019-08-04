import { Injectable } from '@angular/core';
import { IRolesService } from '../interfaces/rolesservice.interface';
import { Role } from "../models/role.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenJWT } from 'src/app/models/tokenjwt.model';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService implements IRolesService {

  private resourceUrl: string;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
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