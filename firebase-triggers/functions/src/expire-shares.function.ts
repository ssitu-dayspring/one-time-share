import * as functions from "firebase-functions";

export const expireShare = functions.firestore
    .document('expire_share_trigger/{docId}')
    .onUpdate((event) => {
        return true;
    });