import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as moment from "moment";

const COLL_SHARE = 'share';

admin.initializeApp(functions.config().firebase);

export const expireShares = functions.firestore
    .document('expirer/SHARE')
    .onUpdate((event) => {
        try {
            let shares = admin.firestore()
                .collection(COLL_SHARE)
                .where('date_created', '<=', moment().subtract(48, 'hours').toDate())
                .where('is_active', '==', true)
                .get();

            shares.then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.update({
                        content: '',
                        token: '',
                        is_active: false,
                        date_modified: admin.firestore.FieldValue.serverTimestamp()
                    });
                });
            });
        } catch (err) {
            console.error(err.toString());
        }

        return true;
    });