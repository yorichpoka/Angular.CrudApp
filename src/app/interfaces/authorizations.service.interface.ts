import { AuthorizationModel } from 'src/app/models/authorization.model';

export interface IAuthorizationsService {
    
    create(obj: AuthorizationModel)                         : Promise<AuthorizationModel>;
    readByIdRoleAndIdMenu(idRole: number, idMenu: number)   : Promise<AuthorizationModel>;
    readAll()                                               : Promise<AuthorizationModel[]>;
    update(id : string, obj: AuthorizationModel)            : Promise<void>;
    delete(id: string)                                      : Promise<void>;
    deleteArray(ids: string[])                              : Promise<void>;

}