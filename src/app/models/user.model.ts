import { Role } from './role.model';

export class User {

    public id : number;
    public idRole : number;
    public login : string;
    public password : string;
    public name : string;
    public role : Role;

    constructor() {
        this.id = 0;
        this.idRole = 0;
        this.role = new Role();
    }

}