import { User } from './user.model';

export class TokenJWT {

    public value           : string = '';
    public creationDate    : Date = new Date();
    public expirationDate  : Date = new Date();
    public user            : User = new User();

    constructor() { }

}