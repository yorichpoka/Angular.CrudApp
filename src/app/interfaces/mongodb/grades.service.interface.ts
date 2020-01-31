import { GradeModel } from 'src/app/models/mongodb/grade.model';

export interface IGradesService {
    
    create(obj: GradeModel)                 : Promise<GradeModel>;
    readById(id: string)                    : Promise<GradeModel>;
    readAll()                               : Promise<GradeModel[]>;
    update(id : string, obj: GradeModel)    : Promise<void>;
    delete(id: string)                      : Promise<void>;
    deleteArray(ids: string[])              : Promise<void>;

}