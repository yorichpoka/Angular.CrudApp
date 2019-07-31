import { Injectable } from '@angular/core';
import { Menu } from "../../models/menu.model";
import { IMenusServiceDAO } from '../dao/i.menus.service.dao';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenusService implements IMenusServiceDAO {

  constructor(private http: HttpClient) { }

  create(obj: Menu): Observable<Menu> {
    throw new Error("Method not implemented.");
  }

  readById(id: number): Observable<Menu> {
    throw new Error("Method not implemented.");
  }

  readAll(): Observable<Menu[]> {
    throw new Error("Method not implemented.");
  }

  update(obj: Menu): Observable<void> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Observable<void> {
    throw new Error("Method not implemented.");
  }

}
