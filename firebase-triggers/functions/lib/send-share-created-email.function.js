"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const EmailTemplate = require("email-templates");
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().gmail.email,
        pass: functions.config().gmail.password
    }
});
const APP_NAME = '[DEV] One Time Share';
exports.sendShareCreatedEmail = functions.firestore
    .document('share/{docId}')
    .onCreate((event) => {
    const noreply = `${APP_NAME} <noreply@one.time.share.com>`;
    const document = event.data.data();
    const locals = {
        senderEmail: document['sender_email'],
        receiverEmail: document['receiver_email'],
        url: document['url']
    };
    const email = new EmailTemplate({
        message: {
            from: noreply
        },
        transport: mailTransport,
        views: {
            options: {
                extension: 'handlebars'
            }
        }
    });
    console.info('Email created');
    email.send({
        template: 'share-invitation',
        message: {
            to: document['receiver_email']
        },
        locals: locals
    }).then(() => {
        console.info('Email Sent');
    }).catch((error) => {
        console.error('Error Sending Email', error.message);
    });
    return true;
});
//# sourceMappingURL=send-share-created-email.function.js.map