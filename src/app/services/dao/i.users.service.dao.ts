import { User } from 'src/app/models/user.model';
import { TokenJWT } from 'src/app/models/tokenjwt.model';
import { Observable } from 'rxjs';

export interface IUsersServiceDAO {
    
    create(obj: User)           : Promise<User>;
    readById(id: number)        : Promise<User>;
    authentication(obj: User)   : Promise<TokenJWT>;
    readAll()                   : Promise<User[]>;
    update(obj: User)           : Promise<void>;
    delete(id: number)          : Promise<void>;

}