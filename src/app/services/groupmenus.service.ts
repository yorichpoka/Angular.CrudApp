import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { AppSetting } from '../models/appsetting.model';
import { IGroupMenusService } from '../interfaces/groupmenusservice.interface';
import { GroupMenu } from '../models/groupmenu.model';

@Injectable({
  providedIn: 'root'
})
export class GroupMenusService implements IGroupMenusService {

  private urlResource : string = '/groupMenus/';
  private appSetting  : AppSetting = new AppSetting();

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this.appSetting = this.sessionService.getAppSetting();
  }

  create(obj: GroupMenu): Promise<GroupMenu> {
    return this.http.post<GroupMenu>(this.appSetting.apiUrl + this.urlResource, obj)
                    .toPromise();
  }

  readById(id: number): Promise<GroupMenu> {
    return  this.http.get<GroupMenu>(this.appSetting.apiUrl + this.urlResource + id)
                .toPromise();
  }

  readAll(): Promise<GroupMenu[]> {
    return  this.http.get<GroupMenu[]>(this.appSetting.apiUrl + this.urlResource)
                .toPromise();
  }

  update(obj: GroupMenu): Promise<void> {
    return  this.http.put<void>(this.appSetting.apiUrl + this.urlResource + obj.id, obj)
                .toPromise();
  }

  delete(id: number): Promise<void> {
    return  this.http.delete<void>(this.appSetting.apiUrl + this.urlResource + id)
                .toPromise();
  }

}