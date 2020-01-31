import { Connexion } from '../helpers/connexion.helper';
import { AppSettingModel } from '../models/appsetting.model';
import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';

export interface ISessionService {
    
    getConnexion()                              : Connexion;
    setConnexion(connexion : Connexion)         : void;
    init()                                      : void;
    setAppSetting(appSetting: AppSettingModel)  : void;
    setUser(user: UserModel)                    : void;
    setToken(tokenJwt: TokenModel)              : void;

}