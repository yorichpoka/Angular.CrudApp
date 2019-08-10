import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { TokenJWT } from 'src/app/models/tokenjwt.model';
import { SessionService } from './session.service';
import { IUsersService } from '../interfaces/usersservice.interface';
import { Connexion } from '../helpers/connexion.helper';

@Injectable({
  providedIn: 'root'
})
export class UsersService implements IUsersService {

  private urlResource : string = '/users/';
  private connexion  : Connexion = new Connexion();

  constructor(
    private http: HttpClient,
    private sessionService: SessionService) {
      this.connexion = this.sessionService.getConnexion();
  }

  create(obj: User): Promise<User> {
    return this.http.post<User>(this.connexion.appSetting.apiUrl + this.urlResource, obj)
                    .toPromise();
  }

  readById(id: number): Promise<User> {
    return this.http.get<User>(this.connexion.appSetting.apiUrl + this.urlResource + id)
                    .toPromise();
  }

  authentication(obj: User): Promise<TokenJWT> {
    return this.http.post<TokenJWT>(this.connexion.appSetting.apiUrl + this.urlResource + 'auth/', obj)
                    .toPromise();
  }

  readAll(): Promise<User[]> {
    return this.http.get<User[]>(this.connexion.appSetting.apiUrl + this.urlResource)
                    .toPromise();
  }

  update(obj: User): Promise<void> {
    return this.http.put<void>(this.connexion.appSetting.apiUrl + this.urlResource + obj.id, obj)
                    .toPromise();
  }

  delete(id: number): Promise<void> {
    return this.http.delete<void>(this.connexion.appSetting.apiUrl + this.urlResource + id)
              .toPromise();
  }

}