import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LOG_LOGGER_PROVIDERS } from 'angular2-logger/core';

import { ShareFormComponent } from './share-form.component';
import { ConfirmationComponent } from './confirmation.component';
import { ShareFormService } from '../../services/share-form.service';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule
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
