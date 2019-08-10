export class LoadPanel {

    public isShowPane   : boolean;
    public isVisible    : boolean;
    public message      : string;
    
    constructor(message : string = 'Loading...', isVisible : boolean = false, isShowPane : boolean = true) {
        this.isVisible = isVisible;
        this.isShowPane = isShowPane;
        this.message = message;
        this.isShowPane = true;
    }

    public static show(message : string = 'Loading...') : LoadPanel {
        return new LoadPanel(message, true);
    }

    public static hide() : LoadPanel {
        return new LoadPanel();
    }

}