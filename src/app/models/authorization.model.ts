export class AuthorizationModel {

    public id:              string;
    public idRole:          number = 0;
    public idMenu:          number = 0;
    public create:          boolean = false;
    public read:            boolean = false;
    public update:          boolean = false;
    public Delete:          boolean = false;
    public creationDate:    Date = new Date();

    constructor() { }

}