import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: functions.config().gmail.email,
        pass: functions.config().gmail.password
    }
});

const APP_NAME = '[DEV] One Time Share';

export const sendShareCreatedEmail = functions.firestore
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
        }).catch((error: any) => {
            console.error('Error Sending Email', error.message);
        });

        return true;
    });