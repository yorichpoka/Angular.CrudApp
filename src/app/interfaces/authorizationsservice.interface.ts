import { Authorization } from 'src/app/models/authorization.model';
import { Observable } from 'rxjs';

export interface IAuthorizationsService {
    
    create(obj: Authorization)                              : Observable<Authorization>;
    readByIdRoleAndIdMenu(idRole: number, idMenu: number)   : Observable<Authorization>;
    readAll()                                               : Observable<Authorization[]>;
    update(obj: Authorization)                              : Observable<void>;
    delete(idRole: number, idMenu: number)                  : Observable<void>;

}