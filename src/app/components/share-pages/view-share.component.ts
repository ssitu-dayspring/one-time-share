import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private firebaseSvc: FirebaseManagerService
    ) {
        this.uid = undefined;
        this.share = null;
    }

    ngOnInit() {
        this.activatedRouter.params.subscribe(params => {
            this.uid = params['id'];

            this.firebaseSvc.getShareById(this.uid).then((doc) => {
                this.share = (doc.exists)
                    ? doc.data()
                    : null;

                if (!this.share || this.share.content.length === 0 || !this.share.is_active) {
                    this.router.navigateByUrl('expired');
                }
            });
        });
    }
}