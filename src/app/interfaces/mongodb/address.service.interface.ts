import { AddressModel } from 'src/app/models/mongodb/address.model';

export interface IAddresssService {
    
    create(obj: AddressModel)               : Promise<AddressModel>;
    readById(id: string)                    : Promise<AddressModel>;
    readAll()                               : Promise<AddressModel[]>;
    update(id : string, obj: AddressModel)  : Promise<void>;
    delete(id: string)                      : Promise<void>;
    deleteArray(ids: string[])              : Promise<void>;

}