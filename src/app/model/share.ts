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

    // cannot have more than 1 inequality comparisons when querying firestore, so use is_active as a way to check
    // whether token and content are empty or not
    is_active: boolean;
}