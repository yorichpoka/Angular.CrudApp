import { Injectable, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from 'src/app/models/token.model';
import { SessionService } from './session.service';
import { IUsersService } from '../interfaces/users.service.interface';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { DisconnectionModel } from '../models/disconnection.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUsersService {

  private _urlResource                : string = '/users/';
  private _urlApi                     : string;
  private _hubConnection              : HubConnection;
  onUserCreated                       : EventEmitter<UserModel> = new EventEmitter();
  onUserUpdated                       : EventEmitter<UserModel> = new EventEmitter();
  onUserDeleted                       : EventEmitter<number> = new EventEmitter();
  onUsersDeleted                      : EventEmitter<number[]> = new EventEmitter();
  onHubConnectionEstablished          : EventEmitter<Boolean> = new EventEmitter();
  onUserDisconnected                  : EventEmitter<DisconnectionModel> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService) {
      this._urlApi = this.sessionService.getAppSetting().apiUrl;
      this._configHub();
  }

  create(obj: UserModel): Promise<UserModel> {
    return this.http
               .post<UserModel>(this._urlApi + this._urlResource, obj)
               .toPromise();
  }

  readById(id: number): Promise<UserModel> {
    return this.http
               .get<UserModel>(this._urlApi + this._urlResource + id)
               .toPromise();
  }

  authentication(obj: UserModel): Promise<TokenModel> {
    return this.http
               .post<TokenModel>(this._urlApi + this._urlResource + 'auth/', obj)
               .toPromise();
  }

  disconnection(id: number): Promise<DisconnectionModel> {
    return this.http
               .delete<DisconnectionModel>(this._urlApi + this._urlResource + 'signOut/' + id)
               .toPromise();
  }
  
  readAll(): Promise<UserModel[]> {
    return this.http
               .get<UserModel[]>(this._urlApi + this._urlResource)
               .toPromise();
  }

  update(id : number, obj: UserModel): Promise<void> {
    return this.http
               .put<void>(this._urlApi + this._urlResource + id, obj)
               .toPromise();
  }

  delete(id: number): Promise<void> {
    return this.http
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
    var url : string = this._urlApi.replace('api', '') + 'userHub';
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
    // UserCreated
    this._hubConnection.on('UserCreated', 
      (data: UserModel) => {
        this.onUserCreated.emit(data);
      }
    );
    // UserUpdated
    this._hubConnection.on('UserUpdated', 
      (data: UserModel) => {
        this.onUserUpdated.emit(data);
      }
    );
    // UserDeleted
    this._hubConnection.on('UserDeleted', 
      (data: number) => {
        this.onUserDeleted.emit(data);
      }
    );
    // UsersDeleted
    this._hubConnection.on('UsersDeleted', 
      (data: number[]) => {
        this.onUsersDeleted.emit(data);
      }
    );
    // GetHubConnectionId
    this._hubConnection.on('GetHubConnectionId', 
      (data: any) => {
        console.info('GetHubConnectionId: ' + data);
      }
    );
    // UserDisconnected
    this._hubConnection.on('UserDisconnected', 
      (data: DisconnectionModel) => {
        console.info('UserDisconnected: ' + JSON.stringify(data));
        this.onUserDisconnected.emit(data);
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
            // Emit success connection
            this.onHubConnectionEstablished.emit(true);
            this.getHubConnectionIdServer()
                .then(
                  (idConnectionHub : string) => {
                    console.log('IdConnectionHub: ' + idConnectionHub);
                    this.sessionService.setIdConnectionHub(idConnectionHub);
                  }
                );
          }
        )
        .catch(
          (error : any) => {
            console.warn('Error while establishing connection, retrying...' + JSON.stringify(error));
          }
        );
  }

  /**
   * ...
   */
  getHubConnectionIdServer() : Promise<string> {
    return  this._hubConnection
                .invoke<string>("GetHubConnectionIdServer");
  }

  /**
   * ...
   */
  logInServer(id : number) : Promise<boolean> {
    return  this._hubConnection
                .invoke<boolean>("LogInServer", this.sessionService.getIdConnectionHub(), id);
  }

  /**
   * ...
   */
  logOutServer(id : number) : Promise<boolean> {
    return  this._hubConnection
                .invoke<boolean>("LogOutServer", this.sessionService.getIdConnectionHub(), id);
  }

  /**
   * ...
   */
  private _configHub() : void {
    this._createConnection();
    this._registerOnServerEvents();
    this._startConnection();
  }

}