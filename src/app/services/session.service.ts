import { Injectable } from '@angular/core';
import { ISessionService } from '../interfaces/sessionservice.interface';
import { Connexion } from '../helpers/connexion.helper';
import { AppSetting } from '../models/appsetting.model';
import { User } from '../models/user.model';
import { TokenJWT } from '../models/tokenjwt.model';

@Injectable({
    providedIn: 'root'
})
export class SessionService implements ISessionService {

    private keyConnexion: string = 'keyConnexion';

    constructor() { }

    init(): void {
        sessionStorage.clear();
        this.setConnexion(new Connexion());
    }

    getConnexion(): Connexion {
        var connexion: Connexion = JSON.parse(
            sessionStorage.getItem(this.keyConnexion)
        );

        if(connexion == null)
            connexion = new Connexion();

        return connexion;
    }

    setConnexion(connexion: Connexion): void {
        sessionStorage.setItem(
            this.keyConnexion,
            JSON.stringify(connexion)
        );
    }

    setAppSetting(appSetting: AppSetting) : void {
        var connexion : Connexion = this.getConnexion();
        connexion.appSetting = appSetting;
        this.setConnexion(connexion);
    }

    setUser(user: User) : void {
        var connexion : Connexion = this.getConnexion();
        connexion.user = user;
        this.setConnexion(connexion);
    }

    setToken(tokenJwt: TokenJWT) : void {
        var connexion : Connexion = this.getConnexion();
        connexion.tokenJwt = tokenJwt;
        this.setConnexion(connexion);
    }

}