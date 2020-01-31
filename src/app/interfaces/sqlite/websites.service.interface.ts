import { WebSiteModel } from 'src/app/models/sqlite/webSite.model';

export interface IWebSitesService {
    
    create(obj: WebSiteModel)               : Promise<WebSiteModel>;
    readById(id: number)                    : Promise<WebSiteModel>;
    readAll()                               : Promise<WebSiteModel[]>;
    update(id : number, obj: WebSiteModel)  : Promise<void>;
    delete(id: number)                      : Promise<void>;
    deleteArray(ids: number[])              : Promise<void>;

}