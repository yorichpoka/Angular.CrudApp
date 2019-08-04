import { Role } from 'src/app/models/role.model';

export interface IRolesService {
    
    create(obj: Role)       : Promise<Role>;
    readById(id: number)    : Promise<Role>;
    readAll()               : Promise<Role[]>;
    update(obj: Role)       : Promise<void>;
    delete(id: number)      : Promise<void>;

}