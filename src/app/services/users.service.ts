import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenJWT } from 'src/app/models/tokenjwt.model';
import { SessionService } from './session.service';
import { AppsettingsService } from './appsettings.service';
import { AppSetting } from 'src/app/models/appsetting.model';
import { IUsersService } from '../interfaces/usersservice.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUsersService {

  private headers: HttpHeaders;
  private urlResource: string;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private appSettingService: AppsettingsService) {
    this.urlResource = '/users';
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  create(obj: User): Promise<User> {
    return new Promise<User>(
      (resolve, reject) => {
        this.appSettingService
          .getAppSettings()
          .then(
            (dataAppSetting: AppSetting) => {
              // Update header.
              this.headers = this.headers.append('Authorization', 'Bearer ' + this.sessionService.getToken().value);

              this.http.post<User>(dataAppSetting.apiUrl + this.urlResource + '/auth/', obj, { headers: this.headers })
                .toPromise()
                .then(
                  (dataUser: User) => {
                    resolve(dataUser);
                  }
                )
                .catch(
                  (reason: any) => {
                    reject(reason);
                  }
                );
            }
          )
          .catch(
            (reason: any) => {
              reject(reason);
            }
          );
      }
    );
  }

  readById(id: number): Promise<User> {
    return new Promise<User>(
      (resolve, reject) => {
        this.appSettingService
          .getAppSettings()
          .then(
            (dataAppSetting: AppSetting) => {
              // Update header.
              this.headers = this.headers.append('Authorization', 'Bearer ' + this.sessionService.getToken().value);

              this.http.get<User>(dataAppSetting.apiUrl + this.urlResource + id, { headers: this.headers })
                .toPromise()
                .then(
                  (dataUser: User) => {
                    resolve(dataUser);
                  }
                )
                .catch(
                  (reason: any) => {
                    reject(reason);
                  }
                );
            }
          )
          .catch(
            (reason: any) => {
              reject(reason);
            }
          );
      }
    );
  }

  authentication(obj: User): Promise<TokenJWT> {
    return new Promise<TokenJWT>(
      (resolve, reject) => {
        this.appSettingService
          .getAppSettings()
          .then(
            (dataAppSetting: AppSetting) => {
              this.http.post<TokenJWT>(dataAppSetting.apiUrl + this.urlResource + '/auth/', obj, { headers: this.headers })
                .toPromise()
                .then(
                  (dataTokenJWT: TokenJWT) => {
                    resolve(dataTokenJWT);
                  }
                )
                .catch(
                  (reason: any) => {
                    reject(reason);
                  }
                );
            }
          )
          .catch(
            (reason: any) => {
              reject(reason);
            }
          );
      }
    );
  }

  readAll(): Promise<User[]> {
    return new Promise<User[]>(
      (resolve, reject) => {
        this.appSettingService
          .getAppSettings()
          .then(
            (dataAppSetting: AppSetting) => {
              // Update header.
              this.headers = this.headers.append('Authorization', 'Bearer ' + this.sessionService.getToken().value);

              this.http.get<User[]>(dataAppSetting.apiUrl + this.urlResource, { headers: this.headers })
                .toPromise()
                .then(
                  (dataUsers: User[]) => {
                    resolve(dataUsers);
                  }
                )
                .catch(
                  (reason: any) => {
                    reject(reason);
                  }
                );
            }
          )
          .catch(
            (reason: any) => {
              reject(reason);
            }
          );
      }
    );
  }

  update(obj: User): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.appSettingService
          .getAppSettings()
          .then(
            (dataAppSetting: AppSetting) => {
              // Update header.
              this.headers = this.headers.append('Authorization', 'Bearer ' + this.sessionService.getToken().value);

              this.http.put<void>(dataAppSetting.apiUrl + this.urlResource + obj.id, obj, { headers: this.headers })
                .toPromise()
                .then(
                  () => {
                    resolve();
                  }
                )
                .catch(
                  (reason: any) => {
                    reject(reason);
                  }
                );
            }
          )
          .catch(
            (reason: any) => {
              reject(reason);
            }
          );
      }
    );
  }

  delete(id: number): Promise<void> {
    return new Promise<void>(
      (resolve, reject) => {
        this.appSettingService
          .getAppSettings()
          .then(
            (dataAppSetting: AppSetting) => {
              // Update header.
              this.headers = this.headers.append('Authorization', 'Bearer ' + this.sessionService.getToken().value);

              this.http.delete<void>(dataAppSetting.apiUrl + this.urlResource + id, { headers: this.headers })
                .toPromise()
                .then(
                  () => {
                    resolve();
                  }
                )
                .catch(
                  (reason: any) => {
                    reject(reason);
                  }
                );
            }
          )
          .catch(
            (reason: any) => {
              reject(reason);
            }
          );
      }
    );
  }

}