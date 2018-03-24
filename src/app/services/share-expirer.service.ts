import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';

import { FirestoreService, serverTimestamp } from '../shared/services/firestore.service';


const COLL_SHARE_EXPIRER = 'expirer';
const DOC_ID_SHARE = 'SHARE';

@Injectable()
export class ShareExpirerService
{
    private shareExpirerColl: AngularFirestoreCollection<any>;

    constructor(private firestoreSvc: FirestoreService) {
        this.shareExpirerColl = firestoreSvc.getCollection(COLL_SHARE_EXPIRER);
    }

    updateShareExpirer() {
        this.firestoreSvc
            .getDocumentSnapshot(this.shareExpirerColl, DOC_ID_SHARE)
            .then((shareExpirer) => {
                let version = shareExpirer.exists
                    ? shareExpirer.data()['version'] + 1
                    : 1;

                shareExpirer.ref.set({
                    version: version,
                    updated_at: serverTimestamp
                });
            });
    }
}