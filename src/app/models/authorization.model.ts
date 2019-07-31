export class Authorization {

    constructor(
        public idRole:         number, 
        public idMenu:         number, 
        public create:         boolean,
        public read:           boolean,
        public update:         boolean,
        public Delete:         boolean,
        public creationDate:   Date
    ) 
    { }

}