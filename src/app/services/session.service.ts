import { Injectable } from '@angular/core';
import { TokenJWT } from 'src/app/models/tokenjwt.model';
import { User } from 'src/app/models/user.model';
import { ISessionService } from '../interfaces/sessionservice.interface';

@Injectable({
    providedIn: 'root'
})
export class SessionService implements ISessionService {

    private keyTokenJwt: string = 'keyTokenJwt';
    private keyUserConnected: string = 'keyUserConnected';

    constructor() { }

    clear(): void {
        sessionStorage.clear();
    }

    // #region token
    isExistToken(): boolean {
        var token: TokenJWT = this.getToken();

        return (token != undefined && token != null);
    }

    getToken(): TokenJWT {
        var tokenJWT: TokenJWT = JSON.parse(
            sessionStorage.getItem(this.keyTokenJwt)
        );

        return tokenJWT;
    }

    setToken(tokenJWT: TokenJWT): void {
        sessionStorage.setItem(
            this.keyTokenJwt,
            JSON.stringify(tokenJWT)
        );
    }
    //#endregion

    // #region User connected.
    isExistUserConnected(): boolean {
        var user: User = this.getUserConnected();

        return (user != undefined && user != null && user.id != 0);
    }

    getUserConnected(): User {
        var user: User = JSON.parse(
            sessionStorage.getItem(this.keyUserConnected)
        );

        if (user == undefined || user == null) {
            user = new User();
        }

        return user;
    }

    setUserConnected(user: User): void {
        sessionStorage.setItem(
            this.keyUserConnected,
            JSON.stringify(user)
        );
    }
    // #endregion

}