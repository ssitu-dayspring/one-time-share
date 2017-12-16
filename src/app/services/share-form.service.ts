import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Share } from '../model/share';
import { FirebaseManagerService } from './firebase-manager.service';

//var email = require('../../emailjs/email.js');

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

        this.sendEmail(formData);

        this.firebaseSvc.save(share);
        console.log('Submitted');
    }

    sendEmail(formData: any) {
        //let server = email.server.connect({
        //    user:     'dev.one.time.share@gmail.com',
        //    password: 'devpass2017',
        //    host:     'smtp.gmail.com',
        //    ssl:      true
        //});
        //
        console.debug('debug');
        console.info('info');
        console.log('log');
        console.warn('warn');
        console.error('error');
        console.warn({
            text: 'This is a message.',
            from: 'dev.one.time.share@gmail.com',
            to: formData.receiverEmail,
            cc: '',
            subject: 'Share'
        });
    }

    reset() {
        this.mainForm.reset({
            senderEmail: '',
            content: '',
            receiverEmail: ''
        })
    }
}