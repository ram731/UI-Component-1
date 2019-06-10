import { Component, Input } from "@angular/core";

interface PageFooterDetail{
    leftButtonTxt?:string,
    leftButtonAction?:Function,
    disableLeftButton?:boolean,
    rightButtonTxt?:string,
    rightButtonAction?:Function,
    disableRightButton?:boolean
}

/**
 * This adds page footer with left and right button.
 * 
 * Depending on input flag buttons will be displayed, enable and disabled.
 * 
 * Action to performed on click of each button is set as input param.
 * 
 * @example: <page-footer [pageFooterDTL]="{
 *                                             leftButtonTxt:'BACK'
 *                                             leftButtonAction:()=>{//go back}
 *                                             rightButtonTxt:'SAVE PAGE & CONTINUE'
 *                                             rightButtonAction:()=>{//go to next page}
 *                                          }">
 *          </page-footer>
 */
@Component({
    selector:'page-footer',
    templateUrl:'./page-footer.component.html'
})
export class PageFooterComponent{

    @Input('pageFooterDTL') pageFooterDTL:PageFooterDetail = { 
        leftButtonTxt:null,
        leftButtonAction:null,
        disableLeftButton:false,
        rightButtonTxt:null,
        rightButtonAction:null,
        disableRightButton:false
    };

    
}