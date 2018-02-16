import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { serverTimestamp } from '../../shared/services/firestore.service';
import { ShareService } from '../../services/share.service';

import { Share } from '../../model/share';

import { BaseAbstractShare } from './shared/base-abstract-share';

import * as moment from 'moment';

@Component({
    selector: 'view-share',
    template: require('./view-share.component.html')
})

export class ViewShareComponent extends BaseAbstractShare
{
    docId: string;
    share: Share;

    constructor(
        private activatedRouter: ActivatedRoute,
        private router: Router,
        protected shareSvc: ShareService
    ) {
        super(shareSvc);

        this.share = null;
    }

    ngOnInit() {
        this.activatedRouter.params.subscribe(params => {
            let token = params['token'];
            let isShareValid = false;

            this.shareSvc.getShareByToken(token).subscribe((snapshots: any[]) => {
                if (snapshots.length > 0) {
                    let data = snapshots[0].payload.doc;

                    if (data.exists) {
                        this.docId = data.id;
                        this.share = data.data();

                        isShareValid = this.share
                            && moment(this.share.date_created) > moment().subtract(48, 'hours');
                    }
                }

                if (isShareValid) {
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
            is_active: false,
            date_modified: serverTimestamp
        };

        this.shareSvc.setShare(this.docId, data);
    }
}