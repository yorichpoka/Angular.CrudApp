import { Role } from 'src/app/models/role.model';
import { Observable } from 'rxjs';

export interface IRolesServiceDAO {
    
    create(obj: Role)       : Observable<Role>;
    readById(id: number)    : Observable<Role>;
    readAll()               : Observable<Role[]>;
    update(obj: Role)       : Observable<void>;
    delete(id: number)      : Observable<void>;

}