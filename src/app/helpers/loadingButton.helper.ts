import { EFaIcon } from '../enums/faicon.enum';

export class LoadingButton {

    private faIcon          : EFaIcon;
    private loadingFaIcon   : EFaIcon;
    isVisible               : boolean;
    defaultText             : string;
    loadingText             : string;

    constructor(text : string = 'Button', faIcon : EFaIcon = EFaIcon.Check, loadingText : string = 'Loading...', loadingFaIcon : EFaIcon = EFaIcon.Spinner) {
        this.isVisible      = false;
        this.faIcon         = faIcon;
        this.loadingText    = loadingText;
        this.defaultText    = text;
        this.loadingFaIcon  = loadingFaIcon;
    }

    start() : void {
        this.isVisible = true;
    }

    stop() : void {
        this.isVisible = false;
    }

    getHtmlText() : string {
        if(this.isVisible) {
            return ((this.loadingFaIcon != '')  ? '<i class="fa fa-' + this.loadingFaIcon + ' fa-pulse"></i> ' 
                                                : ' ') + this.loadingText;
        } else {
            return ((this.faIcon != EFaIcon.None)   ? '<i class="fa fa-' + this.faIcon + '"></i> '
                                                    : ' ') + this.defaultText;
        }
    }

}