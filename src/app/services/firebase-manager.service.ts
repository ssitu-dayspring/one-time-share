import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    QueryFn,
    Reference
} from 'angularfire2/firestore';

import { Share } from '../model/share';


@Injectable()
export class FirebaseManagerService
{
    constructor(private db: AngularFirestore) {}

    private getShareColl(query?: QueryFn) : AngularFirestoreCollection<any> {
        return this.db.collection('share', query);
    }

    save(share: Share) {
        this.getShareColl().add(share);
    }

    getShareById(uid: string) : Promise<any> {
        return this.getShareColl((ref: any) => {
            // TODO not filtering by filters when using doc.reg.get()
            return ref.where('is_active', '==', true);
        }).doc(uid).ref.get();
    }
}