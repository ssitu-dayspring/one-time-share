import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';

import { FirestoreService } from '../shared/services/firestore.service';

import { Share } from '../model/share';


const COLL_SHARE = 'share';

@Injectable()
export class ShareService
{
    private shareColl: AngularFirestoreCollection<Share>;

    constructor(
        private firestoreSvc: FirestoreService) {

        this.shareColl = firestoreSvc.getCollection(COLL_SHARE);
    }

    createShare(share: Share) {
        this.firestoreSvc.create(this.shareColl, share);
    }

    getSharePromise(docId: string) : Promise<any>{
        return this.firestoreSvc.getDocumentSnapshot(this.shareColl, docId);
    }

    setShare(docId: string, data: any) {
        this.firestoreSvc.update(this.shareColl, docId, data);
    }

    deleteShare(docId: string) {
        this.firestoreSvc.remove(this.shareColl, docId);
    }
}