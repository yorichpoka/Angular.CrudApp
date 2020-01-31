import { GradeModel } from './grade.model';
import { AddressModel } from './address.model';

export class RestaurantModel {

    public restaurant_Id    : string;
    public address          : AddressModel = new AddressModel();
    public borough          : string;
    public cuisine          : string;
    public name             : string;
    public grades           : GradeModel[] = [];

    constructor() { }

}