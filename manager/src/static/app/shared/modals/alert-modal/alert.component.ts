import { Component } from '@angular/core';
import { Utils } from '../../Utils';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({

    selector: 'deq-alert-modal',
    templateUrl: './alert.component.html'
})
export class MydeqAlertModalComponent {

    alertObj: any = {};    

    constructor(private utils: Utils) {

    }
/* 
    showErrorMessage(alertObj: any) {
        this.alertObj = alertObj;
       
    }
 */
    hideErrorMsg() {
       
        if (this.alertObj.mainButtonText === 'RETURN TO DASHBOARD') {
          this.utils.navigateToDashboard();
        } else if(this.alertObj.mainbuttonCallBack){
            this.alertObj.mainbuttonCallBack();
            } else {
            window.open(this.alertObj.mainButtonCTA, '_self');
        }
    }

    showBackToDashboardModal(errorTitle: string, errorMsg: string) {
        this.alertObj = {
            title: errorTitle,
            msg: errorMsg,
            mainButtonText: 'RETURN TO DASHBOARD'
        };
       
    }

    closeErrorMsg() {      
        if(this.alertObj.leftButtonCallBack){
            this.alertObj.leftButtonCallBack();
        }
    }

}
