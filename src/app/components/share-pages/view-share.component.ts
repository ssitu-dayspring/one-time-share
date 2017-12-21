import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { serverTimestamp } from '../../shared/services/firestore.service';
import { ShareService } from '../../services/share.service';

import { Share } from '../../model/share';

@Component({
    selector: 'view-share',
    template: require('./view-share.component.html')
})

export class ViewShareComponent
{
    docId: string;
    share: Share;

    constructor(
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private shareSvc: ShareService
    ) {
        this.share = null;
    }

    ngOnInit() {
        this.activatedRouter.params.subscribe(params => {
            this.docId = params['id'];

            this.shareSvc.getSharePromise(this.docId).then((doc) => {
                this.share = (doc.exists)
                    ? doc.data()
                    : null;

                if (this.share && this.share.content && this.share.is_active) {
                    this.setShareAsViewed();
                } else {
                    this.router.navigateByUrl('expired');
                }
            });
        });
    }

    setShareAsViewed() {
        let data = {
            content: '',
            is_active: false,
            date_modified: serverTimestamp
        };

        this.shareSvc.setShare(this.docId, data);
    }
}