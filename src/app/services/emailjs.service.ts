import { Injectable } from '@angular/core';

var emailjs = require('emailjs/email.js');

@Injectable()
export class EmailjsService
{
    server: any;

    constructor() {
        this.server = emailjs.server.connect(({
            user:     'dev.one.time.share@gmail.com',
            password: 'devpass2017',
            host:     'smtp.gmail.com',
            ssl:      true
        }))
    }

    send(from: string, to: string) {
        this.server.send({
            text: 'This is a message.',
            from: '',
            to: '',
            cc: '',
            subject: ''
        }, function(err: any, message: any) {

        });
    }
}