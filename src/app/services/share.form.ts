import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl, Validators } from '@angular/forms';

import * as firebase from 'firebase/app';

import { Share } from '../model/share';

import { ShareService } from './share.service';
import { serverTimestamp } from '../shared/services/firestore.service';

import { isaRfcEmail } from '../form-validators/index';


@Injectable()
export class ShareFormService
{
    private form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private shareSvc: ShareService
    ) {
        this.initForm();
    }

    private initForm() {
        this.form = this.fb.group({
            senderEmail:   ['', [Validators.required, isaRfcEmail]],
            content:       ['', Validators.required],
            receiverEmail: ['', [Validators.required, isaRfcEmail]]
        });
    }

    /**
     * Get the entire form
     */
    getForm() : FormGroup {
        return this.form;
    }

    submit() {
        let formData = this.form.getRawValue();
        let share: Share = {
            sender_email: formData.senderEmail,
            receiver_email: formData.receiverEmail,
            content: formData.content,
            date_created: serverTimestamp,
            date_modified: null,
            is_active: true
        };

        this.validate(this.form);

        if (this.form.valid) {
            this.shareSvc.createShare(share);
            console.info('Submitted');
        } else {
            console.warn('Form has errors');
        }
    }

    reset() {
        this.form.reset({
            senderEmail: '',
            content: '',
            receiverEmail: ''
        })
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
        if (!this.form) return false;

        let tree = name.split('.');
        let o: any = this.form;

        tree.forEach(key => {
            o = o.get(key);
        });

        return (error)
            ? o.hasError(error) && !o.pristine
            : o.errors && !o.pristine;
    }
}