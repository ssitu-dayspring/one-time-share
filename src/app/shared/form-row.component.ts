import { Component, Input } from '@angular/core';

import { ShareFormService } from '../services/share-form.service';

export interface Validation {
    type: string
    msg: string;
}

@Component({
    selector: 'form-row',
    template: `
        <div class="form-group" [ngClass]="{'has-error': hasError(formCtrlName)}">
            <ng-content select="[form-section=label]"></ng-content>
            <ng-content select="[form-section=widget]"></ng-content>

            <div *ngFor="let validation of validations">
                <ul *ngIf="hasError(formCtrlName, validation.type)" class="error" role="alert">
                    <li>{{ validation.msg }}</li>
                </ul>
            </div>
        </div>
    `
})

export class FormRowComponent
{
    @Input() validations: any;
    @Input() formCtrlName: string;

    constructor(private shareFormSvc: ShareFormService) {
        this.validations = [];
        this.formCtrlName = '';
    }

    ngOnChanges() {
        console.log(this.validations);
    }

    hasError(name: string, error?: string) : boolean {
        return this.shareFormSvc.hasError(name, error);
    }
}