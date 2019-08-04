import { Injectable } from '@angular/core';
import { Authorization } from "../models/authorization.model";
import { IAuthorizationsService } from '../interfaces/authorizationsservice.interface';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { AppSetting } from '../models/appsetting.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationsService implements IAuthorizationsService {

  private urlResource : string = '/authorizations/';
  private appSetting  : AppSetting = new AppSetting();

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this.appSetting = this.sessionService.getAppSetting();
  }

  create(obj: Authorization): Promise<Authorization> {
    return  this.http.post<Authorization>(this.appSetting.apiUrl + this.urlResource, obj)
                .toPromise();
  }

  readByIdRoleAndIdMenu(idRole: number, idMenu: number): Promise<Authorization> {
    return  this.http.get<Authorization>(this.appSetting.apiUrl + this.urlResource + '/' + idRole + '/' + idMenu)
                .toPromise();
  }

  readAll(): Promise<Authorization[]> {
    return  this.http.get<Authorization[]>(this.appSetting.apiUrl + this.urlResource)
                .toPromise();
  }

  update(obj: Authorization): Promise<void> {
    return  this.http.put<void>(this.appSetting.apiUrl + this.urlResource + '/' + obj.idRole + '/' + obj.idMenu, obj)
                .toPromise();
  }

  delete(idRole: number, idMenu: number): Promise<void> {
    return  this.http.delete<void>(this.appSetting.apiUrl + this.urlResource + '/' + idRole + '/' + idMenu)
                .toPromise();
  }

}
