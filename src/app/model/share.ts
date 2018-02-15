import * as firebase from 'firebase/app';

type FieldValue = firebase.firestore.FieldValue;

export interface Share
{
    sender_email: string;
    receiver_email: string;
    content: string;
    date_created: FieldValue;
    date_modified: FieldValue;
    token: string;
    url: string;
}