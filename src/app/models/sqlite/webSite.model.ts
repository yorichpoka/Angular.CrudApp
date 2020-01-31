import { CoordinateStruct } from '../mongodb/coordinate.model';

export class WebSiteModel {

    public key              : number = 0;
    public Title            : string;
    public Id               : string;
    public Tags             : string;
    public Url              : string;
    public Author           : string;
    public Description      : string;
    public Group            : string;
    public Place            : string;
    public Location         : CoordinateStruct;
    public State            : string;
    public License          : string;
    public Author_Url       : string;
    public Created          : Date = new Date();
    public LastModified     : Date = new Date();
    public MetaDataModified : Date = new Date();

    constructor() { }

}