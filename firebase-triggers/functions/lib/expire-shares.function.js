"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const moment = require("moment");
const COLL_SHARE = 'share';
admin.initializeApp(functions.config().firebase);
exports.expireShares = functions.firestore
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
    }
    catch (err) {
        console.error(err.toString());
    }
    return true;
});
//# sourceMappingURL=expire-shares.function.js.map