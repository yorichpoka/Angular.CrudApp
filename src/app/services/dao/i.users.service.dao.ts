import { User } from 'src/app/models/user.model';
import { TokenJWT } from 'src/app/models/tokenjwt.model';
import { Observable } from 'rxjs';

export interface IUsersServiceDAO {
    
    create(obj: User)           : Observable<User>;
    readById(id: number)        : Observable<User>;
    authentication(obj: User)   : Observable<TokenJWT>;
    readAll()                   : Observable<User[]>;
    update(obj: User)           : Observable<void>;
    delete(id: number)          : Observable<void>;

}