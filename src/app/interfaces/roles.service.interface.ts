import { RoleModel } from 'src/app/models/role.model';

export interface IRolesService {
    
    create(obj: RoleModel)              : Promise<RoleModel>;
    readById(id: number)                : Promise<RoleModel>;
    readAll()                           : Promise<RoleModel[]>;
    update(id : number, obj: RoleModel) : Promise<void>;
    delete(id: number)                  : Promise<void>;
    deleteArray(ids: number[])          : Promise<void>;

}