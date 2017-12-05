import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { ShareFormService } from "../../services/share-form.service";


@Component({
    selector: 'share-form',
    template: require('./share-form.component.html')
})

export class ShareFormComponent
{
    mainForm: FormGroup;
    items: Observable<any[]>;

    constructor(
        private shareFormSvc: ShareFormService,
        private db: AngularFirestore
    ) {}

    ngOnInit() {
        this.mainForm = this.shareFormSvc.getMainForm();
        this.items = this.db.collection('share').valueChanges();

        this.items.subscribe((data: any) => {
            console.log('Data: ', data);
        });
    }

    onSubmit() {
        this.shareFormSvc.submit();
    }
}
