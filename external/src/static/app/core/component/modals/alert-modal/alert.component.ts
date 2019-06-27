import { Component } from '@angular/core';

@Component({

    selector: 'mydeq-alert-modal',
    templateUrl: './alert.component.html'
})
/**
 * Alert Modal component for consisting of header text and textual body contnet.
 * 
 */
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

    /**
     * To be called for displaying error modal.
     * 
     * @param alertObj - Alert object.
     * 
     * @example -  showErrorMessage({
     *              title: 'In correct details.',
     *              msg: 'Please specify correct details.',
     *              mainButtonText: 'OK'
     *              })
     */ 
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

    /**
     * To be called for displaying modal with 'Return to Dashboard' button.
     * 
     * @param alertObj - Alert object.
     * 
     * @example -  showBackToDashboardModal('In correct details.','Please specify correct details.')
     *   
     */
    showBackToDashboardModal(errorTitle: string, errorMsg: string) {
        this.alertObj = {
            title: errorTitle,
            msg: errorMsg,
            mainButtonText: 'RETURN TO mySTUFF',
            mainButtonCTA: '/mydeq/my-stuff'
        };
        this.showAlert = true;
    }

    /**
     * To be called for displaying modal with 'OK' button.
     * 
     * @param alertObj - Alert object.
     * 
     * @example -  showOkModal('In correct details.','Please specify correct details.')
     * 
     */
    showOkModal(errorTitle: string, errorMsg: string) {
        this.alertObj = {
            title: errorTitle,
            msg: errorMsg,
            mainButtonText: 'OK'
        };
        this.showAlert = true;
    }

    /**
     * To be called for displaying modal with 'CLOSE' button.
     * 
     * @param alertObj - Alert object.
     * 
     * @example - showCloseModal('In correct details.','Please specify correct details.')
     * 
     */
    showCloseModal(errorTitle: string, errorMsg: string) {
        this.alertObj = {
            title: errorTitle,
            msg: errorMsg,
            mainButtonText: 'CLOSE'
        };
        this.showAlert = true;
    }

    /**
     * To be called for displaying modal with 'RETURN TO myStuff' & 'CANCEL' buttons.
     * 
     * @param alertObj - Alert object.
     * 
     * @example - showBackToDashboardCancelModal('In correct details.','Please specify correct details.')
     * 
     */
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

     /**
     * To be called for displaying modal with 'RETURN TO myStuff' & 'CANCEL' buttons.
     * 
     * @param alertObj - Alert object.
     * 
     * @example -  showDangerOkAlert('In correct details.','Please specify correct details.',()=>{//call back code})
     * 
     */
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

    /**
     * To be called for displaying modal with 'RETURN TO myStuff' & 'CANCEL' buttons.
     * 
     * @param alertObj - Alert object.
     * 
     * @example - showContinueCancelModal('In correct details.','Please specify correct details.',()=>{//call back code})
     * 
     */
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

    /**
     * To be called for displaying modal with 'RETURN TO myStuff' & 'CANCEL' buttons.
     * 
     * @param alertObj - Alert object.
     * 
     * @example - showCustomModal('In correct details.','Please specify correct details.','CANCEL','OK',()=>{//call back code})
     * 
     */
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
