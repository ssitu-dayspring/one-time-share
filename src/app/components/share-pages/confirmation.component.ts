import { Component } from '@angular/core';

import { ShareFormService } from '../../services/share.form';

@Component({
    selector: 'confirmation',
    template: require('./confirmation.component.html')
})

export class ConfirmationComponent
{
    constructor(private shareFormSvc: ShareFormService) {}

    onBackToForm() {
        this.shareFormSvc.reset();
    }
}
