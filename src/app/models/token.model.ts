import { UserModel } from './user.model';

export class TokenModel {

    public value           : string;
    public creationDate    : Date = new Date();
    public expirationDate  : Date = new Date();
    public user            : UserModel = new UserModel();

    constructor() { }

}