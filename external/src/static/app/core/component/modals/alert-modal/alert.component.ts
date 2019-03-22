import { Component } from '@angular/core';
//import { Utils } from '../Utils';

@Component({

    selector: 'mydeq-alert-modal',
    templateUrl: './alert.component.html'
})
export class MydeqAlertModalComponent {

    alertObj: any = {};
    showAlert: boolean;
    isDanger: boolean;
    mainbuttonCallBack: Function;

    // Added for Custom modal. 'this' will refer to 'MydeqAlertModalComponent' instead of page componenet
    public nextPage = '';
    public prevPage = '';

    constructor() {

    }
//public utils: Utils
    showErrorMessage(alertObj: any) {
        this.alertObj = alertObj;
        this.showAlert = true;
    }

    hideErrorMsg() {
        this.showAlert = false;
        if (this.alertObj.mainButtonText === 'CONTINUE') {
            this.mainbuttonCallBack();
        } else if (this.alertObj.mainButtonCTA) {
          window.open(this.alertObj.mainButtonCTA, '_self');
        }
        this.isDanger = false;
        if (this.mainbuttonCallBack) {
            this.mainbuttonCallBack();
        }
    }

    closeErrorMsg() {
        this.showAlert = false;
        if (this.alertObj.leftButtonCTA) {
          window.open(this.alertObj.leftButtonCTA, '_self');
        }
        this.isDanger = false;
    }

    showBackToDashboardModal(errorTitle: string, errorMsg: string) {
        this.alertObj = {
            title: errorTitle,
            msg: errorMsg,
            mainButtonText: 'RETURN TO mySTUFF',
            mainButtonCTA: '/mydeq/my-stuff'
        };
        this.showAlert = true;
    }

    showOkModal(errorTitle: string, errorMsg: string) {
        this.alertObj = {
            title: errorTitle,
            msg: errorMsg,
            mainButtonText: 'OK'
        };
        this.showAlert = true;
    }

    showCloseModal(errorTitle: string, errorMsg: string) {
        this.alertObj = {
            title: errorTitle,
            msg: errorMsg,
            mainButtonText: 'CLOSE'
        };
        this.showAlert = true;
    }

    showBackToDashboardCancelModal(errorTitle: string, errorMsg: string) {
        this.alertObj = {
            title: errorTitle,
            msg: errorMsg,
            mainButtonText: 'RETURN TO myStuff',
            leftButtonText: 'CANCEL',
            mainButtonCTA: '/mydeq/my-stuff'
        };
        this.showAlert = true;
    }

    showDangerOkAlert(errorTitle: string, errorMsg: string, callback: Function) {
        this.alertObj = {
            title: errorTitle,
            msg: errorMsg,
            mainButtonText: 'OK'
        };
        this.isDanger = true;
        this.showAlert = true;
        this.mainbuttonCallBack = callback;
    }

    showContinueCancelModal(errorTitle: string, errorMsg: string, callback: Function) {
        this.alertObj = {
            title: errorTitle,
            msg: errorMsg,
            mainButtonText: 'CONTINUE',
            leftButtonText: 'CANCEL'
        };
        this.mainbuttonCallBack = callback;
        this.showAlert = true;
    }

    showCustomModal(errorTitle: string, errorMsg: string, leftbtnTxt: string, rightBtnTxt: string,  mainCallback: Function) {
        this.alertObj = {
            title: errorTitle,
            msg: errorMsg,
            mainButtonText: rightBtnTxt,
            leftButtonText: leftbtnTxt
        };
        this.mainbuttonCallBack = mainCallback;
        this.showAlert = true;
    }

}
