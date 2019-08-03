import { User } from 'src/app/models/user.model';
import { TokenJWT } from 'src/app/models/tokenjwt.model';

export interface ISessionService {
    
    getToken()                      : TokenJWT;
    setToken(tokenJWT : TokenJWT)   : void;
    getUser()                       : User;
    setUser(user : User)            : void;
    init()                          : void;

}