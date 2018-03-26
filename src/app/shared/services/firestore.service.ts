import {
    AngularFirestore,
    AngularFirestoreCollection as ngfCollection,
    QueryFn,
    DocumentChangeAction, AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import * as app from 'firebase/app';

import DocumentChangeType = app.firestore.DocumentChangeType;

declare type FieldValue = app.firestore.FieldValue;
declare type DocumentSnapshot = app.firestore.DocumentSnapshot;


export abstract class FirestoreService
{
    // collection of all documents
    protected collection: AngularFirestoreCollection<any>;
    protected serverTimestamp: FieldValue;

    protected abstract getCollectionName() : string;


    constructor(
        protected db: AngularFirestore) {

        this.collection = this.getCollection();
        this.serverTimestamp = app.firestore.FieldValue.serverTimestamp();
    }

    getServerTimestamp() : FieldValue {
        return this.serverTimestamp;
    }

    /**
     * get Collection to add new document to Firestore database, or get an existing Document object
     */
    getCollection(query?: QueryFn) : ngfCollection<any> {
        return this.db.collection(this.getCollectionName(), query);
    }

    /**
     * add new a document to a collection
     */
    create(data: any) {
        this.collection.add(data);
    }

    /**
     * update a document in a collection
     */
    update(docId: string, data: any) {
        this.collection.doc(docId).update(data);
    }

    /**
     * delete a document from collection
     */
    remove(docId: string) {
        this.collection.doc(docId).delete();
    }

    /**
     * A Promise of one document.
     *
     * A `DocumentSnapshot` contains data read from a document in your Firestore
     * database. The data can be extracted with `.data()` or `.get(<field>)` to
     * get a specific field.
     */
    getDocumentSnapshot(docId: string) : Promise<DocumentSnapshot> {
        return this.collection.doc(docId).ref.get();
    }

    /**
     * An Observable of document data without metadata
     */
    getDocuments(query?: QueryFn, events?: DocumentChangeType[]): Observable<any[]> {
        return this.getCollection(query).valueChanges(events);
    }

    /**
     * An Observable of document data as DocumentChangeAction with metadata.
     *
     * Metadata provides DocumentReference and document id. Gives more horsepower with other Angular integrations such
     * as ngrx, forms, and animations due to the `type` property. The `type` property on each DocumentChangeAction is
     * useful for ngrx reducers, form states, and animation states.
     */
    getDocumentsWithMetadata(query?: QueryFn): Observable<DocumentChangeAction[]> {
        return this.getCollection(query).snapshotChanges();
    }
}
