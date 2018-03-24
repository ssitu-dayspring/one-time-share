import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PlatformLocation } from '@angular/common';

import { ShareFormService } from '../../services/share.form';
import { ShareExpirerService } from '../../services/share-expirer.service';

import { BaseAbstractShare } from './shared/base-abstract-share';

@Component({
    selector: 'share-form',
    template: require('./share-form.component.html'),
    styles: [require('./share-form.component.scss')]
})

export class ShareFormComponent extends BaseAbstractShare
{
    form: FormGroup;

    validationsAll: any = {};

    constructor(
        private router: Router,
        private shareFormSvc: ShareFormService,
        private platformLocation: PlatformLocation,
        protected shareExpirerSvc: ShareExpirerService
    ) {
        super(shareExpirerSvc);
    }

    ngOnInit() {
        this.form = this.shareFormSvc.getForm();

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
        let token = ((Math.random() + 1) * (new Date()).getTime()).toString(36).replace(".", "").substr(0, 10);
        let url = (this.platformLocation as any).location.origin + "/#/view_share/" + token;
        this.shareFormSvc.submit(token, url);

        if (this.form.valid) {
            this.router.navigateByUrl('/confirmation');
        }
    }
}
