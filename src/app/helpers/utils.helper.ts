import { ETypeNotify } from '../enums/typenotify';
import notify from 'devextreme/ui/notify';
import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { confirm } from 'devextreme/ui/dialog';

export function confirmdDelete(): Promise<boolean> {
    return confirm(
        '<p class="lead mb-0">' +
            '<i class="fa fa-info-circle"></i> Are you sure you want delete it?' +
        '</p>',
        'Question'
    );
}

export function confirmdAction(): Promise<boolean> {
    return confirm(
        '<p class="lead mb-0">' +
            '<i class="fa fa-info-circle"></i> Are you sure you want do it?' +
        '</p>',
        'Question'
    );
}

export function notification(message: string, type: ETypeNotify = ETypeNotify.Error, duration: number = 4000): void {
    notify({ message: message, width: 400 }, type, duration);
}

export function validatorCheckPasswords(formGroup: FormGroup): any {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    return password === confirmPassword ? null
        : {
            notSame: true
        };
}

export function validatorMatchValue(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
        return (!!control.parent && !!control.parent.value && control.value === control.parent.controls[matchTo].value) ? null
            : { isMatching: false };
    };
}