import { MenuModel } from 'src/app/models/menu.model';

export interface IMenusService {
    
    create(obj: MenuModel)              : Promise<MenuModel>;
    readById(id: number)                : Promise<MenuModel>;
    readAll()                           : Promise<MenuModel[]>;
    update(id : number, obj: MenuModel) : Promise<void>;
    delete(id: number)                  : Promise<void>;
    deleteArray(ids: number[])          : Promise<void>;

}