import { GroupMenuModel } from 'src/app/models/groupmenu.model';

export interface IGroupMenusService {
    
    create(obj: GroupMenuModel)                 : Promise<GroupMenuModel>;
    readById(id: number)                        : Promise<GroupMenuModel>;
    readAll()                                   : Promise<GroupMenuModel[]>;
    update(id : number, obj: GroupMenuModel)    : Promise<void>;
    delete(id: number)                          : Promise<void>;
    deleteArray(ids: number[])                  : Promise<void>;

}