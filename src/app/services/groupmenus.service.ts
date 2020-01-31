import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { IGroupMenusService } from '../interfaces/groupmenus.service.interface';
import { GroupMenuModel } from '../models/groupmenu.model';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class GroupMenusService implements IGroupMenusService {

  private _urlResource : string = '/groupMenus/';
  private _urlApi      : string;
  private _hubConnection              : HubConnection;
  onGroupMenuCreated                       : EventEmitter<GroupMenuModel> = new EventEmitter();
  onGroupMenuUpdated                       : EventEmitter<GroupMenuModel> = new EventEmitter();
  onGroupMenuDeleted                       : EventEmitter<number> = new EventEmitter();
  onGroupMenusDeleted                      : EventEmitter<number[]> = new EventEmitter();
  onHubConnectionEstablished          : EventEmitter<Boolean> = new EventEmitter();

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this._urlApi = this.sessionService.getAppSetting().apiUrl;
      this._ConfigHub();
  }

  create(obj: GroupMenuModel): Promise<GroupMenuModel> {
    return this.http
               .post<GroupMenuModel>(this._urlApi + this._urlResource, obj)
               .toPromise();
  }

  readById(id: number): Promise<GroupMenuModel> {
    return  this.http
                .get<GroupMenuModel>(this._urlApi + this._urlResource + id)
                .toPromise();
  }

  readAll(): Promise<GroupMenuModel[]> {
    return  this.http
                .get<GroupMenuModel[]>(this._urlApi + this._urlResource)
                .toPromise();
  }

  update(id : number, obj: GroupMenuModel): Promise<void> {
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
    var url : string = this._urlApi.replace('api', '') + 'groupMenuHub';
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
    // GroupMenuCreated
    this._hubConnection.on('GroupMenuCreated', 
      (data: GroupMenuModel) => {
        this.onGroupMenuCreated.emit(data);
      }
    );
    // GroupMenuUpdated
    this._hubConnection.on('GroupMenuUpdated', 
      (data: GroupMenuModel) => {
        this.onGroupMenuUpdated.emit(data);
      }
    );
    // GroupMenuDeleted
    this._hubConnection.on('GroupMenuDeleted', 
      (data: number) => {
        this.onGroupMenuDeleted.emit(data);
      }
    );
    // GroupMenusDeleted
    this._hubConnection.on('GroupMenusDeleted', 
      (data: number[]) => {
        this.onGroupMenusDeleted.emit(data);
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