import { Injectable } from '@angular/core';
import { TokenJWT } from 'src/app/models/tokenjwt.model';
import { User } from 'src/app/models/user.model';
import { ISessionService } from '../interfaces/sessionservice.interface';
import { AppSetting } from '../models/appsetting.model';

@Injectable({
    providedIn: 'root'
})
export class SessionService implements ISessionService {

    private keyTokenJwt     : string = 'keyTokenJwt';
    private keyUser         : string = 'keyUser';
    private keyAppSetting   : string = 'keyAppSetting';

    constructor() { }

    init(): void {
        this.setToken(new TokenJWT());
        this.setUser(new User());
        this.setAppSetting(new AppSetting());
    }

    // #region token
    getToken(): TokenJWT {
        const tokenJWT: TokenJWT =  JSON.parse(
                                        localStorage.getItem(this.keyTokenJwt)
                                    );

        return tokenJWT;
    }

    setToken(tokenJWT: TokenJWT): void {
        localStorage.setItem(
            this.keyTokenJwt,
            JSON.stringify(tokenJWT)
        );
    }
    //#endregion

    // #region User connected.
    getUser(): User {
        const user: User =  JSON.parse(
                                localStorage.getItem(this.keyUser)
                            );

        return user;
    }

    setUser(user: User): void {
        localStorage.setItem(
            this.keyUser,
            JSON.stringify(user)
        );
    }
    // #endregion

    // #region Appsetting.
    getAppSetting(): AppSetting {
        const appsetting: AppSetting =  JSON.parse(
                                            localStorage.getItem(this.keyAppSetting)
                                        );

        return appsetting;
    }

    setAppSetting(appsetting: AppSetting): void {
        localStorage.setItem(
            this.keyAppSetting,
            JSON.stringify(appsetting)
        );
    }
    // #endregion
    
}