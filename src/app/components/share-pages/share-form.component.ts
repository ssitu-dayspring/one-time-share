import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { ShareFormService } from "../../services/share-form.service";


@Component({
    selector: 'share-form',
    template: require('./share-form.component.html'),
    styles: [require('./share-form.component.scss')]
})

export class ShareFormComponent
{
    mainForm: FormGroup;
    items: Observable<any[]>;

    validationsAll: any = {};

    constructor(
        private router: Router,
        private shareFormSvc: ShareFormService,
        private db: AngularFirestore
    ) {}

    ngOnInit() {
        this.mainForm = this.shareFormSvc.getMainForm();
        this.items = this.db.collection('share').valueChanges();

        this.validationsAll = {
            senderEmail: [
                { type: 'required', msg: 'Sender Email field required' },
                { type: 'isaRfcEmail', msg: 'Invalid email' },
            ],
            content: [
                { type: 'required', msg: 'Content field required' }
            ],
            receiverEmail: [
                { type: 'required', msg: 'Receiver Email field required' },
                { type: 'isaRfcEmail', msg: 'Invalid email' }
            ]
        }
    }

    hasError(name: string, error?: string) : boolean {
        return this.shareFormSvc.hasError(name, error);
    }

    onSubmit() {
        this.shareFormSvc.submit();

        if (this.mainForm.valid) {
            this.router.navigateByUrl('/confirmation');
        }
    }
}
