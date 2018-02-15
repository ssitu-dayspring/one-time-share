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
            let token = params['token'];

            this.shareSvc.getShareByToken(token).subscribe((snapshots: any) => {
                if (snapshots.length > 0) {
                    let data = snapshots[0].payload.doc;

                    if (data.exists) {
                        this.docId = data.id;
                        this.share = data.data();
                    }
                }

                if (this.share) {
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
            token: '',
            date_modified: serverTimestamp
        };

        this.shareSvc.setShare(this.docId, data);
    }
}