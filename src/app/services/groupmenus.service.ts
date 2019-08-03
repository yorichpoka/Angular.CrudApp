import { Injectable } from '@angular/core';
import { GroupMenu } from '../models/groupmenu.model';
import { IGroupMenusService } from '../interfaces/groupmenusservice.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupmenusService implements IGroupMenusService {

  private resourceUrl: string;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  create(obj: GroupMenu): Observable<GroupMenu> {
    return this.http.post<GroupMenu>(this.resourceUrl, obj, { headers: this.headers });
  }

  readById(id: number): Observable<GroupMenu> {
    return this.http.get<GroupMenu>(this.resourceUrl + id, { headers: this.headers });
  }

  readAll(): Observable<GroupMenu[]> {
    return this.http.get<GroupMenu[]>(this.resourceUrl, { headers: this.headers });
  }

  update(obj: GroupMenu): Observable<void> {
    return this.http.put<void>(this.resourceUrl + obj.id, obj, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.resourceUrl + id, { headers: this.headers });
  }

}
