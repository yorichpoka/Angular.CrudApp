import { UserModel } from 'src/app/models/user.model';
import { TokenModel } from 'src/app/models/token.model';
import { Observable } from 'rxjs';
import { DisconnectionModel } from '../models/disconnection.model';

export interface IUsersService {
    
    create(obj: UserModel)              : Promise<UserModel>;
    readById(id: number)                : Promise<UserModel>;
    authentication(obj: UserModel)      : Promise<TokenModel>;
    disconnection(id: number)           : Promise<DisconnectionModel>;
    readAll()                           : Promise<UserModel[]>;
    update(id : number, obj: UserModel) : Promise<void>;
    delete(id: number)                  : Promise<void>;
    deleteArray(ids: number[])          : Promise<void>;

}