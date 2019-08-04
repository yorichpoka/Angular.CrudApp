import { User } from 'src/app/models/user.model';
import { TokenJWT } from 'src/app/models/tokenjwt.model';
import { AppSetting } from '../models/appsetting.model';

export interface ISessionService {
    
    getToken()                          : TokenJWT;
    setToken(tokenJWT : TokenJWT)       : void;
    getUser()                           : User;
    setAppSetting(user : AppSetting)    : void;
    getAppSetting()                     : AppSetting;
    setUser(user : User)                : void;
    init()                              : void;

}