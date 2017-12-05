import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { ShareFormComponent } from './share-form.component';
import { ConfirmationComponent }    from './confirmation.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: '/form', pathMatch: 'full' },
        { path: 'form', component: ShareFormComponent },
        { path: 'confirmation', component: ConfirmationComponent }
    ])],
    exports: [RouterModule]
})
export class SharePagesRoutingModule {}