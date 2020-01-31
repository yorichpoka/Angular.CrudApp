import { Injectable } from '@angular/core';
import { ISessionService } from '../interfaces/session.service.interface';
import { Connexion } from '../helpers/connexion.helper';
import { AppSettingModel } from '../models/appsetting.model';
import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';

@Injectable({
    providedIn: 'root'
})
export class SessionService implements ISessionService {

    private _keyConnexion: string = 'keyConnexion';

    constructor() { }

    init() : void {
        sessionStorage.clear();
        this.setConnexion(new Connexion());
    }

    getConnexion() : Connexion {
        var connexion: Connexion = JSON.parse(
            sessionStorage.getItem(this._keyConnexion)
        );

        if(connexion == null)
            connexion = new Connexion();

        return connexion;
    }

    setConnexion(connexion: Connexion) : void {
        sessionStorage.setItem(
            this._keyConnexion,
            JSON.stringify(connexion)
        );
    }

    getAppSetting() : AppSettingModel {
        return this.getConnexion().appSetting;
    }

    setAppSetting(appSetting: AppSettingModel) : void {
        var connexion : Connexion = this.getConnexion();
        connexion.appSetting = appSetting;
        this.setConnexion(connexion);
    }

    getUser() : UserModel {
        return this.getConnexion().user;
    }

    setUser(user: UserModel) : void {
        var connexion : Connexion = this.getConnexion();
        connexion.user = user;
        this.setConnexion(connexion);
    }

    getToken() : TokenModel {
        return this.getConnexion().token;
    }

    setToken(tokenJwt: TokenModel) : void {
        var connexion : Connexion = this.getConnexion();
        connexion.token = tokenJwt;
        this.setConnexion(connexion);
    }

    getIdConnectionHub() : string {
        return this.getConnexion().idConnectionHub;
    }

    setIdConnectionHub(idConnectionHub: string) : void {
        var connexion : Connexion = this.getConnexion();
        connexion.idConnectionHub = idConnectionHub;
        this.setConnexion(connexion);
    }

}