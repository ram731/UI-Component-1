import { Component, Input } from "@angular/core";

interface EachQuestionDetail{
    isChild?:boolean,
    qstHeaderText:string,
    qstText:string,
    childNumber?:string,
    qstStatus:string,
    revisionNeeded?:string,
    revisionText?:string,
    showRevision?:boolean
}
@Component({
    selector:'individual-qst',
    templateUrl:'./each-question.component.html'
})
export class EachQuestion{

    @Input('questionDetail') eachQuestionDetail:EachQuestionDetail ={ isChild:false,  qstHeaderText:null, qstText:null, childNumber:null, qstStatus:null, revisionNeeded:null };

}