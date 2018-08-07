import { Component } from '@angular/core';
import { Utils } from '../../Utils';

@Component({

    selector: 'mydeq-alert-modal',
    templateUrl: './alert.component.html'
})
export class MydeqAlertModalComponent {

    alertObj: any = {};
    showAlert: boolean;

    constructor(private utils: Utils) {

    }

    showErrorMessage(alertObj: any) {
        this.alertObj = alertObj;
        this.showAlert = true;
    }

    hideErrorMsg() {
        this.showAlert = false;
        if (this.alertObj.mainButtonText === 'EXIT' || this.alertObj.mainButtonText === 'RETURN TO AZDEQ HOME') {
            this.utils.gotoMyApplications();
        } else if(this.alertObj.mainbuttonCallBack){
            this.alertObj.mainbuttonCallBack();
            } else {
            window.open(this.alertObj.mainButtonCTA, '_self');
        }
    }

    showBackToAZHomeModal(errorTitle: string, errorMsg: string) {
        this.alertObj = {
            title: errorTitle,
            msg: errorMsg,
            mainButtonText: 'RETURN TO AZDEQ HOME'
        };
        this.showAlert = true;
    }

    closeErrorMsg() {
        this.showAlert = false;
    }

}
