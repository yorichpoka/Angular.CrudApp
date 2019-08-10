import { Role } from './role.model';

export class User {

    public id       : number = 0;
    public idRole   : number = 0;
    public login    : string = '';
    public password : string = '';
    public name     : string = '';
    public role     : Role = new Role();

    constructor() { }

}