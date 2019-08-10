import { TokenJWT } from '../models/tokenjwt.model';
import { User } from '../models/user.model';
import { AppSetting } from '../models/appsetting.model';

export class Connexion {

    tokenJwt    : TokenJWT;
    user        : User;
    appSetting  : AppSetting;

    constructor(tokenJwt : TokenJWT = new TokenJWT(), user : User = new User(), appSetting: AppSetting = new AppSetting()) {
        this.tokenJwt = tokenJwt;
        this.user = user;
        this.appSetting = appSetting;
    }

}