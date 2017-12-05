import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AngularFirestore } from 'angularfire2/firestore';

import { FirebaseManagerService } from '../../services/firebase-manager.service';

import { Share } from '../../model/share';


@Component({
    selector: 'view-share',
    template: require('./view-share.component.html')
})

export class ViewShareComponent
{
    uid: string;
    share: Share;

    constructor(
        private router: ActivatedRoute,
        private firebaseSvc: FirebaseManagerService
    ) {
        this.uid = undefined;
        this.share = null;
    }

    ngOnInit() {
        this.router.params.subscribe(params => {
            this.uid = params['id'];

            this.firebaseSvc.getShareById(this.uid).then((doc) => {
                this.share = (doc.exists)
                    ? doc.data()
                    : null;
            });
        });
    }
}