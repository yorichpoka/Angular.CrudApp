import { Authorization } from 'src/app/models/authorization.model';

export interface IAuthorizationsServiceDAO {
    
    create(obj: Authorization)                              : Promise<Authorization>;
    readByIdRoleAndIdMenu(idRole: number, idMenu: number)   : Promise<Authorization>;
    readAll()                                               : Promise<Authorization[]>;
    update(obj: Authorization)                              : Promise<void>;
    delete(idRole: number, idMenu: number)                  : Promise<void>;

}