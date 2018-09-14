import { Component, Input, Output, IterableDiffers, DoCheck, EventEmitter  } from '@angular/core';
import { Utils } from '../../../shared/Utils';

@Component({
    selector: 'comments',
    templateUrl: './comments.component.html'
})
export class CommentsComponent implements DoCheck{

    @Input('reviewList')
    reviewList:any[]=[];

    @Input('defaultClass')
    defaultClass:string="comments";

    @Input('isPageLevel')
    isPageLevel:boolean=false;

    @Output('editEvt')
    editEvent=new EventEmitter();

    //commentHeaderColor:string="rejected";
    approveStatus:string=null;
    differ: any;

    commentHeaderColor:any={
        A:'mydeq-teal',
        R:'rejected',
        AE:''
    };
    
    
    constructor(private utils:Utils,differs: IterableDiffers){       
        this.differ = differs.find([]).create(null);
    }

    ngDoCheck() {
        const change = this.differ.diff(this.reviewList);
        if(change){

            if(change.collection && change.collection.length > 0){
                this.approveStatus = change.collection[0].status;
            }
          
        }
        
    }

    editPage(){
        this.editEvent.emit('editclick');
    }

}