import { User } from './user.model';

export class TokenJWT {

    constructor(
        public value?           : string, 
        public creationDate?    : Date,
        public expirationDate?  : Date,
        public user?            : User
    ) 
    { 
        this.value = '';
        this.user = new User();
        this.creationDate = new Date();
        this.expirationDate = new Date();
    }

}