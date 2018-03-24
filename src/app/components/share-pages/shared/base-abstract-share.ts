import { ShareExpirerService } from '../../../services/share-expirer.service';


export abstract class BaseAbstractShare
{
    constructor(protected shareExpirerSvc: ShareExpirerService) {
        this.expireOldShares();
    }

    /**
     * Each time /form or /view_share is loaded, set all old Shares as expired
     */
    expireOldShares() {
        this.shareExpirerSvc.updateShareExpirer();
    }
}