import { Injectable } from '@angular/core';
import { Menu } from "../models/menu.model";
import { IMenusService } from '../interfaces/menusservice.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSetting } from '../models/appsetting.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class MenusService implements IMenusService {

  private urlResource : string = '/menus/';
  private appSetting  : AppSetting = new AppSetting();

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this.appSetting = this.sessionService.getAppSetting();
  }

  create(obj: Menu): Promise<Menu> {
    return this.http.post<Menu>(this.appSetting.apiUrl + this.urlResource, obj)
                    .toPromise();
  }

  readById(id: number): Promise<Menu> {
    return  this.http.get<Menu>(this.appSetting.apiUrl + this.urlResource + id)
                .toPromise();
  }

  readAll(): Promise<Menu[]> {
    return  this.http.get<Menu[]>(this.appSetting.apiUrl + this.urlResource)
                .toPromise();
  }

  update(obj: Menu): Promise<void> {
    return  this.http.put<void>(this.appSetting.apiUrl + this.urlResource + obj.id, obj)
                .toPromise();
  }

  delete(id: number): Promise<void> {
    return  this.http.delete<void>(this.appSetting.apiUrl + this.urlResource + id)
                .toPromise();
  }

}