import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';
import * as moment from 'moment';

import { Share } from '../model/share';

import { FirebaseManagerService } from './firebase-manager.service';

import { isaRfcEmail } from '../form-validators/index';

@Injectable()
export class ShareFormService
{
    mainForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private firebaseSvc: FirebaseManagerService
    ) {
        this.mainForm = this.fb.group({
            senderEmail:   ['', [Validators.required, isaRfcEmail]],
            content:       ['', Validators.required],
            receiverEmail: ['', [Validators.required, isaRfcEmail]]
        });
    }

    getMainForm() : FormGroup {
        return this.mainForm;
    }

    submit() {
        let formData = this.mainForm.getRawValue();
        let share: Share = {
            sender_email: formData.senderEmail,
            receiver_email: formData.receiverEmail,
            content: formData.content,
            date_created: moment().format('YYYY-MM-DD HH:mm:ss'),
            date_modified: null,
            is_active: true
        };

        this.validate(this.mainForm);

        if (this.mainForm.valid) {
            this.firebaseSvc.save(share);
            console.info('Submitted');
        } else {
            console.warn('Form has errors');
        }
    }

    validate(formGroup: (FormGroup | FormArray)) {
        Object.keys(formGroup.controls).forEach((field) => {
            let control: AbstractControl = formGroup.get(field);

            if (control instanceof FormControl) {
                control.markAsDirty({onlySelf: true});
            } else if (control instanceof FormGroup || control instanceof FormArray) {
                this.validate(<FormGroup> control);
            }
        });
    }

    hasError(name: string, error?: string) : boolean {
        if (!this.mainForm) return false;

        let tree = name.split('.');
        let o: any = this.mainForm;

        tree.forEach(key => {
            o = o.get(key);
        });

        return (error)
            ? o.hasError(error) && !o.pristine
            : o.errors && !o.pristine;
    }

    reset() {
        this.mainForm.reset({
            senderEmail: '',
            content: '',
            receiverEmail: ''
        })
    }
}