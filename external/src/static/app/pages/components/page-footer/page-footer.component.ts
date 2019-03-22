import { Component, Input } from "@angular/core";

interface PageFooterDetail{
    leftButtonTxt?:string,
    leftButtonAction?:Function,
    disableLeftButton?:boolean,
    rightButtonTxt?:string,
    rightButtonAction?:Function,
    disableRightButton?:boolean
}

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