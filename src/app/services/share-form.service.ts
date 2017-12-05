import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Share } from '../model/share';


@Injectable()
export class ShareFormService
{
    mainForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private db: AngularFirestore
    ) {
        this.mainForm = this.fb.group({
            senderEmail: [],
            content: [],
            receiverEmail: []
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

        this.db.collection('share').add(share);

        console.log('Submitted');
    }
}