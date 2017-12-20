import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { ShareFormComponent } from './share-form.component';
import { ConfirmationComponent }    from './confirmation.component';
import { ViewShareComponent }    from './view-share.component';
import { ExpiredComponent }    from './expired.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: '/form', pathMatch: 'full' },
        { path: 'form', component: ShareFormComponent },
        { path: 'confirmation', component: ConfirmationComponent },
        { path: 'view_share/:id', component: ViewShareComponent },
        { path: 'expired', component: ExpiredComponent }
    ])],
    exports: [RouterModule]
})
export class SharePagesRoutingModule {}