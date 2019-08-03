import { User } from './user.model';

export class TokenJWT {

    public value           : string;
    public creationDate    : Date;
    public expirationDate  : Date;
    public user            : User = new User();

    constructor() { }

}