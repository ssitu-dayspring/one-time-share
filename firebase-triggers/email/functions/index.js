const functions  = require('firebase-functions');
const nodemailer = require('nodemailer');
const Email      = require('email-templates');

const gmailEmail    = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

const APP_NAME = '[DEV] One Time Share';

exports.sendCreateEmail = functions.firestore
    .document('share/{docId}')
    .onCreate((event) => {
        const noreply = `${APP_NAME} <noreply@one.time.share.com>`;
        const document = event.data.data();
        const locals = {
            docId: event.params.docId,
            senderEmail: document['sender_email'],
            receiverEmail: document['receiver_email']
        };

        const email = new Email({
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
            template: 'receiver',
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
