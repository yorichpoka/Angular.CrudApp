import { Injectable } from '@angular/core';
import { Authorization } from "../../models/authorization.model";
import { IAuthorizationsServiceDAO } from '../dao/i.authorizations.service.dao';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationsService implements IAuthorizationsServiceDAO {
  
  constructor(private http: HttpClient) 
  { }

  create(obj: Authorization): Promise<Authorization> {
    throw new Error("Method not implemented.");
  }  readByIdRoleAndIdMenu(idRole: number, idMenu: number): Promise<Authorization> {
    throw new Error("Method not implemented.");
  }
  readAll(): Promise<Authorization[]> {
    throw new Error("Method not implemented.");
  }
  update(obj: Authorization): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(idRole: number, idMenu: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
