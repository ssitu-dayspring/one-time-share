import { AbstractControl } from '@angular/forms';

export function isaRfcEmail(control: AbstractControl) {
    let email = control.value.toString();
    let pattern = /^([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/;

    return !email ||  email.match(pattern) !== null
        ? undefined : { isaRfcEmail: {valid: false} };
}
