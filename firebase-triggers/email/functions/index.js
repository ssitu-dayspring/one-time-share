const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

const APP_NAME = 'One Time Share';

function sendEmail() {
    var email = 'foo@example.com';

    const mailOptions = {
        from: APP_NAME + '<noreply@dev.one-time-share.com>',
        to: email
    };

    mailOptions['subject'] = 'Subject';
    mailOptions['text'] = 'Content goes here.';

    return mailTransport.sendEmail(mailOptions).then(function() {
        console.log('Email send.');
    });
}