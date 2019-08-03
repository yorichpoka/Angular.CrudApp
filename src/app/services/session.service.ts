import { Injectable } from '@angular/core';
import { TokenJWT } from 'src/app/models/tokenjwt.model';
import { User } from 'src/app/models/user.model';
import { ISessionService } from '../interfaces/sessionservice.interface';

@Injectable({
    providedIn: 'root'
})
export class SessionService implements ISessionService {

    private keyTokenJwt: string = 'keyTokenJwt';
    private keyUser: string = 'keyUser';

    constructor() { }

    init(): void {
        this.setToken(new TokenJWT());
        this.setUser(new User());
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

}