import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { FirestoreService } from '../shared/services/firestore.service';

import { Share } from '../model/share';


const COLL_SHARE = 'share';

@Injectable()
export class ShareService extends FirestoreService
{
    constructor(
        protected db: AngularFirestore) {

        super(db);
    }

    protected getCollectionName() {
        return COLL_SHARE;
    }

    createShare(share: Share) {
        this.create(share);
    }

    getSharePromise(docId: string) : Promise<any>{
        return this.getDocumentSnapshot(docId);
    }

    getSharesWithMetadataByToken(token: string) : Observable<any[]> {
        return this.getDocumentsWithMetadata((ref) => {
            return ref.where('token', '==', token);
        });
    }

    updateShare(docId: string, data: any) {
        this.update(docId, data);
    }

    deleteShare(docId: string) {
        this.remove(docId);
    }
}
