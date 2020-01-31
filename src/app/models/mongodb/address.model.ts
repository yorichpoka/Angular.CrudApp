import { CoordinateModel } from './coordinate.model';

export class AddressModel {

    public address_Id   : string;
    public building     : string;
    public street       : string;
    public zipCode      : string;
    public coordinate   : CoordinateModel = new CoordinateModel();

    constructor() { }

}