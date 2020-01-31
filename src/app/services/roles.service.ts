import { Injectable, EventEmitter } from '@angular/core';
import { IRolesService } from '../interfaces/roles.service.interface';
import { RoleModel } from "../models/role.model";
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class RolesService implements IRolesService {

  private _urlResource : string = '/roles/';
  private _urlApi      : string;
  private _hubConnection              : HubConnection;
  onRoleCreated                       : EventEmitter<RoleModel> = new EventEmitter();
  onRoleUpdated                       : EventEmitter<RoleModel> = new EventEmitter();
  onRoleDeleted                       : EventEmitter<number> = new EventEmitter();
  onRolesDeleted                      : EventEmitter<number[]> = new EventEmitter();
  onHubConnectionEstablished          : EventEmitter<Boolean> = new EventEmitter();

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this._urlApi = this.sessionService.getAppSetting().apiUrl;
      this._ConfigHub();
  }

  create(obj: RoleModel): Promise<RoleModel> {
    return this.http
               .post<RoleModel>(this._urlApi + this._urlResource, obj)
               .toPromise();
  }

  readById(id: number): Promise<RoleModel> {
    return  this.http
                .get<RoleModel>(this._urlApi + this._urlResource + id)
                .toPromise();
  }

  readAll(): Promise<RoleModel[]> {
    return  this.http
                .get<RoleModel[]>(this._urlApi + this._urlResource)
                .toPromise();
  }

  update(id : number, obj: RoleModel): Promise<void> {
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
    var url : string = this._urlApi.replace('api', '') + 'roleHub';
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
    // RoleCreated
    this._hubConnection.on('RoleCreated', 
      (data: RoleModel) => {
        this.onRoleCreated.emit(data);
      }
    );
    // RoleUpdated
    this._hubConnection.on('RoleUpdated', 
      (data: RoleModel) => {
        this.onRoleUpdated.emit(data);
      }
    );
    // RoleDeleted
    this._hubConnection.on('RoleDeleted', 
      (data: number) => {
        this.onRoleDeleted.emit(data);
      }
    );
    // RolesDeleted
    this._hubConnection.on('RolesDeleted', 
      (data: number[]) => {
        this.onRolesDeleted.emit(data);
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
