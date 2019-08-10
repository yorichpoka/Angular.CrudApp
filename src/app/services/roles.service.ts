import { Injectable } from '@angular/core';
import { IRolesService } from '../interfaces/rolesservice.interface';
import { Role } from "../models/role.model";
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { Connexion } from '../helpers/connexion.helper';

@Injectable({
  providedIn: 'root'
})
export class RolesService implements IRolesService {

  private urlResource : string = '/roles/';
  private connexion  : Connexion = new Connexion();

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this.connexion = this.sessionService.getConnexion();
  }

  create(obj: Role): Promise<Role> {
    return this.http.post<Role>(this.connexion.appSetting.apiUrl + this.urlResource, obj)
                    .toPromise();
  }

  readById(id: number): Promise<Role> {
    return  this.http.get<Role>(this.connexion.appSetting.apiUrl + this.urlResource + id)
                .toPromise();
  }

  readAll(): Promise<Role[]> {
    return  this.http.get<Role[]>(this.connexion.appSetting.apiUrl + this.urlResource)
                .toPromise();
  }

  update(obj: Role): Promise<void> {
    return  this.http.put<void>(this.connexion.appSetting.apiUrl + this.urlResource + obj.id, obj)
                .toPromise();
  }

  delete(id: number): Promise<void> {
    return  this.http.delete<void>(this.connexion.appSetting.apiUrl + this.urlResource + id)
                .toPromise();
  }

}
