import { Injectable } from '@angular/core';
import { IRolesService } from '../interfaces/rolesservice.interface';
import { Role } from "../models/role.model";
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { AppSetting } from '../models/appsetting.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService implements IRolesService {

  private urlResource : string = '/roles/';
  private appSetting  : AppSetting = new AppSetting();

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this.appSetting = this.sessionService.getAppSetting();
  }

  create(obj: Role): Promise<Role> {
    return this.http.post<Role>(this.appSetting.apiUrl + this.urlResource, obj)
                    .toPromise();
  }

  readById(id: number): Promise<Role> {
    return  this.http.get<Role>(this.appSetting.apiUrl + this.urlResource + id)
                .toPromise();
  }

  readAll(): Promise<Role[]> {
    return  this.http.get<Role[]>(this.appSetting.apiUrl + this.urlResource)
                .toPromise();
  }

  update(obj: Role): Promise<void> {
    return  this.http.put<void>(this.appSetting.apiUrl + this.urlResource + obj.id, obj)
                .toPromise();
  }

  delete(id: number): Promise<void> {
    return  this.http.delete<void>(this.appSetting.apiUrl + this.urlResource + id)
                .toPromise();
  }

}
