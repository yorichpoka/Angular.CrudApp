import { User } from 'src/app/models/user.model';

export interface IUsersServiceDAO {
    
    create(obj: User) : Promise<void>;
    readById(id: number) : Promise<User>;
    readByLoginAndPassword(login: string, pasword: string) : Promise<User>;
    readAll() : Promise<User[]>;
    update(id: number, obj: User) : Promise<void>;
    delete(id: number) : Promise<boolean>;

}