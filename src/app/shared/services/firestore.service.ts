import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection as ngfCollection,
    AngularFirestoreDocument as ngfDocument,
    QueryFn,
    Reference,
    DocumentChangeAction
} from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

declare type FieldValue = firebase.firestore.FieldValue;
declare type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export var serverTimestamp: FieldValue = firebase.firestore.FieldValue.serverTimestamp();

@Injectable()
export class FirestoreService
{
    constructor(
        private db: AngularFirestore) {
    }

    /**
     * Collection object to add new document to Firestore database, or get an existing Document object
     */
    getCollection(collName: string, query?: QueryFn) : ngfCollection<any> {
        return this.db.collection(collName, query);
    }

    /**
     * Add new document to collection
     */
    create(coll: ngfCollection<any>, obj: any) {
        coll.add(obj);
    }

    /**
     * A Promise of a snapshot of document to read data from a document in the Firestore database
     */
    getDocumentSnapshot(coll: ngfCollection<any>, docId: string) : Promise<DocumentSnapshot> {
        return coll.doc(docId).ref.get();
    }

    /**
     * update a document in collection
     */
    update(coll: ngfCollection<any>, docId: string, data: any) {
        coll.doc(docId).update(data);
    }

    /**
     * delete a document from collection
     */
    remove(coll: ngfCollection<any>, uid: string) {
        coll.doc(uid).delete();
    }
}
