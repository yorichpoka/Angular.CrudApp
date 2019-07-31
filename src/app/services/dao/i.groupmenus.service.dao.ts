import { GroupMenu } from 'src/app/models/groupmenu.model';
import { Observable } from 'rxjs';

export interface IGroupMenusServiceDAO {
    
    create(obj: GroupMenu)  : Observable<GroupMenu>;
    readById(id: number)    : Observable<GroupMenu>;
    readAll()               : Observable<GroupMenu[]>;
    update(obj: GroupMenu)  : Observable<void>;
    delete(id: number)      : Observable<void>;

}