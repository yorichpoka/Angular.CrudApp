import { Connexion } from '../helpers/connexion.helper';
import { AppSetting } from '../models/appsetting.model';
import { User } from '../models/user.model';
import { TokenJWT } from '../models/tokenjwt.model';

export interface ISessionService {
    
    getConnexion()                          : Connexion;
    setConnexion(connexion : Connexion)     : void;
    init()                                  : void;
    setAppSetting(appSetting: AppSetting)   : void;
    setUser(user: User)                     : void;
    setToken(tokenJwt: TokenJWT)         : void;

}