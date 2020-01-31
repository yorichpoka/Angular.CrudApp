import { RoleModel } from './role.model';

export class UserModel {

    public id       : number = 0;
    public idRole   : number = 0;
    public login    : string;
    public password : string;
    public name     : string;
    public role     : RoleModel = new RoleModel();

    constructor() { }

}