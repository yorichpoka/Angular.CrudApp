import { GroupMenu } from 'src/app/models/groupmenu.model';

export interface IGroupMenusService {
    
    create(obj: GroupMenu)  : Promise<GroupMenu>;
    readById(id: number)    : Promise<GroupMenu>;
    readAll()               : Promise<GroupMenu[]>;
    update(obj: GroupMenu)  : Promise<void>;
    delete(id: number)      : Promise<void>;

}