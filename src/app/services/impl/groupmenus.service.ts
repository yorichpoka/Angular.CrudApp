import { Injectable } from '@angular/core';
import { GroupMenu } from "../../models/groupmenu.model";
import { IGroupMenusServiceDAO } from '../dao/i.groupmenus.service.dao';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupmenusService implements IGroupMenusServiceDAO {

  constructor(private http: HttpClient) 
  { }

  create(obj: GroupMenu): Promise<GroupMenu> {
    throw new Error("Method not implemented.");
  }
  readById(id: number): Promise<GroupMenu> {
    throw new Error("Method not implemented.");
  }
  readAll(): Promise<GroupMenu[]> {
    throw new Error("Method not implemented.");
  }
  update(obj: GroupMenu): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
