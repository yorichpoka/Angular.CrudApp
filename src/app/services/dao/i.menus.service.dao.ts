import { Menu } from 'src/app/models/menu.model';
import { Observable } from 'rxjs';

export interface IMenusServiceDAO {
    
    create(obj: Menu)       : Observable<Menu>;
    readById(id: number)    : Observable<Menu>;
    readAll()               : Observable<Menu[]>;
    update(obj: Menu)       : Observable<void>;
    delete(id: number)      : Observable<void>;

}