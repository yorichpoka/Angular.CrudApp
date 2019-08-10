import { Injectable } from '@angular/core';
import { Menu } from "../models/menu.model";
import { IMenusService } from '../interfaces/menusservice.interface';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { Connexion } from '../helpers/connexion.helper';

@Injectable({
  providedIn: 'root'
})
export class MenusService implements IMenusService {

  private urlResource : string = '/menus/';
  private connexion  : Connexion = new Connexion();

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this.connexion = this.sessionService.getConnexion();
  }

  create(obj: Menu): Promise<Menu> {
    return this.http.post<Menu>(this.connexion.appSetting.apiUrl + this.urlResource, obj)
                    .toPromise();
  }

  readById(id: number): Promise<Menu> {
    return  this.http.get<Menu>(this.connexion.appSetting.apiUrl + this.urlResource + id)
                .toPromise();
  }

  readAll(): Promise<Menu[]> {
    return  this.http.get<Menu[]>(this.connexion.appSetting.apiUrl + this.urlResource)
                .toPromise();
  }

  update(obj: Menu): Promise<void> {
    return  this.http.put<void>(this.connexion.appSetting.apiUrl + this.urlResource + obj.id, obj)
                .toPromise();
  }

  delete(id: number): Promise<void> {
    return  this.http.delete<void>(this.connexion.appSetting.apiUrl + this.urlResource + id)
                .toPromise();
  }

}