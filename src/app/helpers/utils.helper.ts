import { ETypeNotify } from '../enums/typenotify';
import notify from 'devextreme/ui/notify';

export function messageConfirmdDelete() : string {
    return  '<p class="lead mb-0">' + 
                '<i class="fa fa-info-circle"></i> Are you sure you want delete it?' +
            '</p>';
}

export function notification(message : string, type : ETypeNotify = ETypeNotify.Error, duration : number = 4000) : void {
    notify({message : message, width : 300 }, type, duration);
}