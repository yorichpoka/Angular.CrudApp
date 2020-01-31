export class CoordinateModel {

    public coordinate_Id    : string;
    public type             : string;
    public coordinate       : CoordinateStruct;

    constructor() { }

}

export interface CoordinateStruct {
    longitude   : number;
    latitude    : number;
}