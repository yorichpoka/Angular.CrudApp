export class LoadPanel {

    public isShowPane   : boolean = false;
    public isVisible    : boolean = false;
    public message      : string;
    
    constructor(message? : string, isVisible? : boolean) {
        this.isVisible = isVisible == null ? false
                                           : isVisible;
        this.message = message == null ? 'Loading...'
                                       : message;
        this.isShowPane = true;
    }

}