import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class ShareFormService
{
    mainForm: FormGroup;

    constructor(private fb: FormBuilder) {
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
        console.log(this.mainForm.getRawValue());
    }
}