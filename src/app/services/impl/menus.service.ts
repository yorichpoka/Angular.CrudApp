import { Injectable } from '@angular/core';
import { Menu } from "../../models/menu.model";
import { IMenusServiceDAO } from '../dao/i.menus.service.dao';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenusService implements IMenusServiceDAO {
  
  constructor(private http: HttpClient) 
  { }

  create(obj: Menu): Promise<Menu> {
    throw new Error("Method not implemented.");
  }
  readById(id: number): Promise<Menu> {
    throw new Error("Method not implemented.");
  }
  readAll(): Promise<Menu[]> {
    throw new Error("Method not implemented.");
  }
  update(obj: Menu): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
