import { Injectable } from '@angular/core';
import { TokenJWT } from 'src/app/models/tokenjwt.model';
import { User } from 'src/app/models/user.model';
import { ISessionService } from '../dao/i.session.service.dao';

@Injectable({
  providedIn: 'root'
})
export class SessionService implements ISessionService {

  private keyTokkenJwt : string;
  private keyUserConnected : string;

  constructor() {
      this.keyTokkenJwt = 'keyTokkenJwt';
      this.keyUserConnected = 'keyUserConnected';
  }

  getToken() : TokenJWT {
      var tokenJWT : TokenJWT = new TokenJWT();

      try {
          tokenJWT =  JSON.parse(
                          localStorage.getItem(this.keyTokkenJwt)
                      );
      } catch { }

      return tokenJWT === null ? new TokenJWT()
                               : tokenJWT;
  }

  setToken(tokenJWT : TokenJWT) : void {
      localStorage.setItem(
                      this.keyTokkenJwt, 
                      JSON.stringify(tokenJWT)
                  );
  }

  getUserConnected() : User {
      var user : User = null;

      try {
          user =  JSON.parse(
                          localStorage.getItem(this.keyUserConnected)
                      );
      } catch { }

      return user;
  }

  setUserConnected(user : User) : void {
      localStorage.setItem(
                      this.keyUserConnected, 
                      JSON.stringify(user)
                  );
  }

  resetUserConnected() : void {
      localStorage.setItem(
                      this.keyUserConnected, 
                      ''
                  );
  }

}