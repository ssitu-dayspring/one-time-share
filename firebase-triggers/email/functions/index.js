const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail    = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

const APP_NAME = 'One Time Share';

exports.sendCreateEmail = functions.firestore
    .document('share/{uid}')
    .onCreate(function(event) {
        const document = event.data.data();
        const senderEmail = document['sender_email'];
        const receiverEmail = document['receiver_email'];
        const uid = event.params.uid;

        const noreply = `${APP_NAME} <noreply@one.time.share.com>`;
        const mailOptions = {
            from: noreply,
            to: receiverEmail
        };

        mailOptions['subject'] = 'Subject';
        mailOptions['text'] = `
            ${senderEmail} has content to share with you.

            Click http://localhost:3000/#/view_share/${uid} to view.

            Please Note. This content will expire in 48 hours. Afterwards, the content will no longer be viewable.
        `;

        return mailTransport.sendMail(mailOptions)
            .then(function () {
                console.info('Email sent.');
            })
            .catch(function (error) {
                console.error('There was an error while sending email.', error.message);
            })
        ;
    });

