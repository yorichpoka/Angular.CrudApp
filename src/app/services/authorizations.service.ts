import { Injectable, EventEmitter } from '@angular/core';
import { AuthorizationModel } from "../models/authorization.model";
import { IAuthorizationsService } from '../interfaces/authorizations.service.interface';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationsService implements IAuthorizationsService {

  private _urlResource : string = '/authorizations/';
  private _urlApi      : string;
  private _hubConnection              : HubConnection;
  onAuthorizationCreated                       : EventEmitter<AuthorizationModel> = new EventEmitter();
  onAuthorizationUpdated                       : EventEmitter<AuthorizationModel> = new EventEmitter();
  onAuthorizationDeleted                       : EventEmitter<number> = new EventEmitter();
  onAuthorizationsDeleted                      : EventEmitter<number[]> = new EventEmitter();
  onHubConnectionEstablished          : EventEmitter<Boolean> = new EventEmitter();

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService) {
      this._urlApi = this.sessionService.getAppSetting().apiUrl;
      this._ConfigHub();
  }

  create(obj: AuthorizationModel): Promise<AuthorizationModel> {
    return  this.http
                .post<AuthorizationModel>(this._urlApi + this._urlResource, obj)
                .toPromise()
                .then(
                  (value : AuthorizationModel) => {
                    return this.setId(value);
                  }
                );
  }

  readByIdRoleAndIdMenu(idRole: number, idMenu: number): Promise<AuthorizationModel> {
    return  this.http
                .get<AuthorizationModel>(this._urlApi + this._urlResource + idRole + '/' + idMenu)
                .toPromise()
                .then(
                  (value : AuthorizationModel) => {
                    return this.setId(value);
                  }
                );
  }

  readAll(): Promise<AuthorizationModel[]> {
    return  this.http
                .get<AuthorizationModel[]>(this._urlApi + this._urlResource)
                .toPromise()
                .then(
                  (values : AuthorizationModel[]) => {
                    return values.map(l => this.setId(l));
                  }
                );
  }

  update(id : string, obj: AuthorizationModel): Promise<void> {
    // Extract id
    var ids : number[] = this.getId(id);
    return  this.http
                .put<void>(this._urlApi + this._urlResource + ids[0] + '/' + ids[1], obj)
                .toPromise();
  }

  delete(id : string): Promise<void> {
    // Extract id
    var ids : number[] = this.getId(id);
    return  this.http
                .delete<void>(this._urlApi + this._urlResource + ids[0] + '/' + ids[1])
                .toPromise();
  }

  deleteArray(ids: string[]): Promise<void> {
    return this.http
               .delete<void>(this._urlApi + this._urlResource + 'Array?' + ids.map(l => `id=${l}`).join('&'))
               .toPromise();
  }

  /**
   * 
   * @param obj 
   */
  private setId(obj : AuthorizationModel) : AuthorizationModel {
    // Set value of id
    obj.id = `${obj.idRole}-${obj.idMenu}`;

    return obj;
  }

  /**
   * 
   * @param value 
   */
  private getId(value : string) : number[] {
    return value.split('-')
                .map(l => {
                    return Number.parseInt(
                              l.toString()
                            );
                  }
                );
  }

  /**
   * ...
   */
  private _createConnection() {
    // Generate url
    var url : string = this._urlApi.replace('api', '') + 'authorizationHub';
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
    // AuthorizationCreated
    this._hubConnection.on('AuthorizationCreated', 
      (data: AuthorizationModel) => {
        this.onAuthorizationCreated.emit(data);
      }
    );
    // AuthorizationUpdated
    this._hubConnection.on('AuthorizationUpdated', 
      (data: AuthorizationModel) => {
        this.onAuthorizationUpdated.emit(data);
      }
    );
    // AuthorizationDeleted
    this._hubConnection.on('AuthorizationDeleted', 
      (data: number) => {
        this.onAuthorizationDeleted.emit(data);
      }
    );
    // AuthorizationsDeleted
    this._hubConnection.on('AuthorizationsDeleted', 
      (data: number[]) => {
        this.onAuthorizationsDeleted.emit(data);
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