import { Component } from '@angular/core';
import { Utils } from '../../Utils';

@Component({

    selector: 'mydeq-navigation-alert-modal',
    templateUrl: './navigation-alert-modal.component.html'
})
export class MydeqNavigationAlertModalComponent {

     alertObj:any = {}
     showNavigationAlert: boolean;

    constructor(private utils:Utils){

    }

    showErrorMessage = (alertObj: any,callback=null) =>{
        this.alertObj = alertObj;
        this.showNavigationAlert = true;

        if(callback){
            callback();
        }
    }

    navigateBack = () =>{
        this.closeAlert();
        this.utils.showLoading("navigateBack");
        this.checkAndOpenWindow(this.alertObj.leftButtonCTA);        
         this.utils.hideLoading("navigateBack");
    }

    proceed = () =>{
        this.closeAlert();   
        this.utils.showLoading("proceed");     
        this.checkAndOpenWindow(this.alertObj.mainButtonCTA);        
        this.utils.hideLoading("proceed");
    }

    private closeAlert =() =>{
            this.showNavigationAlert = false;
    }

    private checkAndOpenWindow =(ctaLink:string)=>{
        if(ctaLink){         
           window.location.href = ctaLink;
        }            
    }
}
