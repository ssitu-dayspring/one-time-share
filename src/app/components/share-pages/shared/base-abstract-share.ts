import { ShareService } from '../../../services/share.service';

import { serverTimestamp } from '../../../shared/services/firestore.service';

export abstract class BaseAbstractShare
{
    constructor(protected shareSvc: ShareService) {
        this.expireOldShares();
    }

    /**
     * Each time /form or /view_share is loaded, set all old Shares as expired
     */
    expireOldShares() {
        this.shareSvc.getExpiringShares().first().subscribe((snapshots: any[]) => {
            snapshots.forEach((snapshot: any) => {
                let data = snapshot.payload.doc;

                this.shareSvc.setShare(data.id, {
                    content: '',
                    token: '',
                    is_active: false,
                    date_modified: serverTimestamp
                });
            });
        });
    }
}