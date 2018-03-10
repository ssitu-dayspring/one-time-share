"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
exports.expireShare = functions.firestore
    .document('expire_share_trigger/{docId}')
    .onUpdate((event) => {
    return true;
});
//# sourceMappingURL=expire-shares.function.js.map