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
import { ViewShareComponent } from './view-share.component';

import { ShareFormService } from '../../services/share-form.service';
import { FirebaseManagerService } from '../../services/firebase-manager.service';

import { SharePagesRoutingModule } from './share-pages-routing.module';
import { environment } from '../../environments/firebase.environment';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        SharePagesRoutingModule
    ],
    exports: [
        ShareFormComponent
    ],
    declarations: [
        ShareFormComponent,
        ConfirmationComponent,
        ViewShareComponent
    ],
    bootstrap: [ShareFormComponent],
    providers: [
        LOG_LOGGER_PROVIDERS,
        ShareFormService,
        FirebaseManagerService
    ]
})
export class SharePagesModule { }
