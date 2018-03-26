import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ShareService } from '../../services/share.service';
import { ShareExpirerService } from '../../services/share-expirer.service';

import { Share } from '../../model/share';

import { BaseAbstractShare } from './shared/base-abstract-share';

import * as moment from 'moment';

@Component({
    selector: 'view-share',
    template: require('./view-share.component.html'),
    styles: [require('./view-share.component.scss')]
})

export class ViewShareComponent extends BaseAbstractShare
{
    docId: string;
    share: Share;

    constructor(
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private shareSvc: ShareService,
        protected shareExpirerSvc: ShareExpirerService
    ) {
        super(shareExpirerSvc);

        this.share = null;
    }

    ngOnInit() {
        this.activatedRouter.params.subscribe(params => {
            let token = params['token'];
            let isShareValid = false;

            this.shareSvc.getSharesWithMetadataByToken(token).subscribe((snapshots: any[]) => {
                if (snapshots.length > 0) {
                    let shareSnapshot = snapshots[0].payload.doc;

                    if (shareSnapshot.exists) {
                        this.docId = shareSnapshot.id;
                        this.share = shareSnapshot.data();

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
            date_modified: this.shareSvc.getServerTimestamp()
        };

        this.shareSvc.updateShare(this.docId, data);
    }
}