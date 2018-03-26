import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { FirestoreService } from '../shared/services/firestore.service';


const COLL_SHARE_EXPIRER = 'expirer';
const DOC_ID_SHARE = 'SHARE';

@Injectable()
export class ShareExpirerService extends FirestoreService
{
    constructor(
        protected db: AngularFirestore) {

        super(db);
    }

    protected getCollectionName() {
        return COLL_SHARE_EXPIRER;
    }

    updateShareExpirer() {
        this.getDocumentSnapshot(DOC_ID_SHARE)
            .then((shareExpirer) => {
                let version = shareExpirer.exists
                    ? shareExpirer.data()['version'] + 1
                    : 1;

                shareExpirer.ref.set({
                    version: version,
                    updated_at: this.getServerTimestamp()
                });
            });
    }
}