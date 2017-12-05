import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ShareFormService } from "../../services/share-form.service";

@Component({
    selector: 'share-form',
    template: require('./share-form.component.html')
})

export class ShareFormComponent
{
    mainForm: FormGroup;

    constructor(private shareFormSvc: ShareFormService) {}

    ngOnInit() {
        this.mainForm = this.shareFormSvc.getMainForm();
    }

    onSubmit() {
        this.shareFormSvc.submit();
    }
}
