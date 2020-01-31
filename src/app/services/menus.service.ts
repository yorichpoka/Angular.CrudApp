import { Injectable, EventEmitter } from '@angular/core';
import { MenuModel } from "../models/menu.model";
import { IMenusService } from '../interfaces/menus.service.interface';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class MenusService implements IMenusService {

  private _urlResource : string = '/menus/';
  private _urlApi      : string;
  private _hubConnection              : HubConnection;
  onMenuCreated                       : EventEmitter<MenuModel> = new EventEmitter();
  onMenuUpdated                       : EventEmitter<MenuModel> = new EventEmitter();
  onMenuDeleted                       : EventEmitter<number> = new EventEmitter();
  onMenusDeleted                      : EventEmitter<number[]> = new EventEmitter();
  onHubConnectionEstablished          : EventEmitter<Boolean> = new EventEmitter();

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this._urlApi = this.sessionService.getAppSetting().apiUrl;
      this._ConfigHub();
  }

  create(obj: MenuModel): Promise<MenuModel> {
    return this.http
               .post<MenuModel>(this._urlApi + this._urlResource, obj)
               .toPromise();
  }

  readById(id: number): Promise<MenuModel> {
    return  this.http
                .get<MenuModel>(this._urlApi + this._urlResource + id)
                .toPromise();
  }

  readAll(): Promise<MenuModel[]> {
    return  this.http
                .get<MenuModel[]>(this._urlApi + this._urlResource)
                .toPromise();
  }

  update(id : number, obj: MenuModel): Promise<void> {
    return  this.http
                .put<void>(this._urlApi + this._urlResource + id, obj)
                .toPromise();
  }

  delete(id: number): Promise<void> {
    return  this.http
                .delete<void>(this._urlApi + this._urlResource + id)
                .toPromise();
  }

  deleteArray(ids: number[]): Promise<void> {
    return this.http
               .delete<void>(this._urlApi + this._urlResource + 'Array?' + ids.map(l => `id=${l}`).join('&'))
               .toPromise();
  }

  /**
   * ...
   */
  private _createConnection() {
    // Generate url
    var url : string = this._urlApi.replace('api', '') + 'menuHub';
    // Create hub connection
    this._hubConnection = new HubConnectionBuilder()
                            .withUrl(url)
                            .build();
  }

  /**
   * ...
   */
  private _registerOnServerEvents() : void {
    ///#region registerOnServerEvents
    // MenuCreated
    this._hubConnection.on('MenuCreated', 
      (data: MenuModel) => {
        this.onMenuCreated.emit(data);
      }
    );
    // MenuUpdated
    this._hubConnection.on('MenuUpdated', 
      (data: MenuModel) => {
        this.onMenuUpdated.emit(data);
      }
    );
    // MenuDeleted
    this._hubConnection.on('MenuDeleted', 
      (data: number) => {
        this.onMenuDeleted.emit(data);
      }
    );
    // MenusDeleted
    this._hubConnection.on('MenusDeleted', 
      (data: number[]) => {
        this.onMenusDeleted.emit(data);
      }
    );
    //#endregion
  }

  /**
   * ...
   */
  private _startConnection() : void {
    this._hubConnection
        .start()
        .then(
          () => {
            console.log('Hub connection started');
            this.onHubConnectionEstablished.emit(true);
          }
        )
        .catch(
          (error : any) => {
          console.warn('Error while establishing connection, retrying...' + JSON.stringify(error));
        });
  }

  /**
   * ...
   */
  private _ConfigHub() : void {
    this._createConnection();
    this._registerOnServerEvents();
    this._startConnection();
  }

}