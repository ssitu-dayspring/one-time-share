import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { ShareFormComponent } from './share-form.component';
import { ConfirmationComponent } from './confirmation.component';
import { ShareFormService } from '../../services/share-form.service';

import { environment } from '../../environments/firebase.environment';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    exports: [
        ShareFormComponent
    ],
    declarations: [
        ShareFormComponent,
        ConfirmationComponent
    ],
    bootstrap: [ShareFormComponent],
    providers: [
        LOG_LOGGER_PROVIDERS,
        ShareFormService
    ]
})
export class SharePagesModule { }
