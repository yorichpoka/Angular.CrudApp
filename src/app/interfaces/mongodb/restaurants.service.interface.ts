import { RestaurantModel } from 'src/app/models/mongodb/restaurant.model';

export interface IRestaurantsService {
    
    create(obj: RestaurantModel)                 : Promise<RestaurantModel>;
    readById(id: string)                    : Promise<RestaurantModel>;
    readAll()                               : Promise<RestaurantModel[]>;
    update(id : string, obj: RestaurantModel)    : Promise<void>;
    delete(id: string)                      : Promise<void>;
    deleteArray(ids: string[])              : Promise<void>;

}