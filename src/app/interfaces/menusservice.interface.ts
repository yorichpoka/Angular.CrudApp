import { Menu } from 'src/app/models/menu.model';

export interface IMenusService {
    
    create(obj: Menu)       : Promise<Menu>;
    readById(id: number)    : Promise<Menu>;
    readAll()               : Promise<Menu[]>;
    update(obj: Menu)       : Promise<void>;
    delete(id: number)      : Promise<void>;

}