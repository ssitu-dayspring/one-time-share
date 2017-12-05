import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Share } from '../model/share';
import { FirebaseManagerService } from './firebase-manager.service';


@Injectable()
export class ShareFormService
{
    mainForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private firebaseSvc: FirebaseManagerService
    ) {
        this.mainForm = this.fb.group({
            senderEmail:   ['', Validators.required],
            content:       ['', Validators.required],
            receiverEmail: ['', Validators.required]
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
            share_content: {
                content: formData.content
            },
            date_created: '',
            is_active: true
        };

        this.firebaseSvc.save(share);
        console.log('Submitted');
    }

    reset() {
        this.mainForm.reset({
            senderEmail: '',
            content: '',
            receiverEmail: ''
        })
    }
}