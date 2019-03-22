import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { BaseComponent } from "../../../core/basecomponent.component";
import { PageConentService } from "../../../core/content/content-service.component";
import { HistoryText } from "./history-page-text";

@Component({
    selector:'review-history',
    templateUrl:'./history.component.html'
})
export class HistoryComponent extends BaseComponent{

    @Input('reviewHistory') reviewHistory;
    constructor(protected activeModal:NgbActiveModal){
        super();
        PageConentService.getInstance().registerPageContent(this, new HistoryText());
    }

    closeModel(){
        this.activeModal.close();
    }

    getStatus(status: string) {
        if(status === 'NDEF') 
            return 'NO DEFICIENCIES DETECTED';
        if(status === 'PDEF')
            return 'POTENTIAL DEFICIENCIES';
        if(status === 'AREQ')
            return 'REQUEST ADDITIONAL DETAILS';
    }

}