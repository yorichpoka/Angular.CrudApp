import { CoordinateModel } from 'src/app/models/mongodb/coordinate.model';

export interface ICoordinatesService {
    
    create(obj: CoordinateModel)                : Promise<CoordinateModel>;
    readById(id: string)                        : Promise<CoordinateModel>;
    readAll()                                   : Promise<CoordinateModel[]>;
    update(id : string, obj: CoordinateModel)   : Promise<void>;
    delete(id: string)                          : Promise<void>;
    deleteArray(ids: string[])                  : Promise<void>;

}