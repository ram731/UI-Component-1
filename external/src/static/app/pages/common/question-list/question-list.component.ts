import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../../../shared/Utils';
import { AppService } from '../../../service/app.service';
import { MyDeqErrorHandler } from '../../../core/errorHandler';
import { LoggerService } from '../../../shared/lib/logger/logger-service.component';
import { PagecontentQuestionList } from './question-list.resourcebundle';
import { BasePathController } from '../../components/base-path-component.component';
import {find,cloneDeep,filter }from 'lodash-es';

@Component({
    selector: 'question-list',
    templateUrl: './question-list.component.html'
})

export class QuestionListComponent extends BasePathController {

    questionList: any[] = [];
    showRevision: boolean = false;

    constructor(protected activatedRoute: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler,
        private logger: LoggerService) {
        super(activatedRoute, formBuilder, utils, appService, errorHandler, new PagecontentQuestionList());
        this.setPageLoadServiceName("questionlist");

        this.pageFooterDTL.rightButtonTxt ='CONTINUE';
        this.pageFooterDTL.disableRightButton = true;
    }


    onGetResponse(getResponse: any): void {
        this.showRevision = this.calculateShowRevision(getResponse.questionList);
        this.questionList = this.generateQuestionList(getResponse.questionList);
        this.logger.debug('In onGetResponse', this.questionList)

        if (!(find(getResponse.questionList, function (o) {
            return o.parentQuestionId === null && o.questionStatus !== 'Complete';
        }))) {
            this.pageFooterDTL.disableRightButton = false;
        }

    }


    createForm(): FormGroup {
        return null;
    }

    generateQuestionList(inputQuestionList: any[]): any[] {
        let returnList: any = [];

        let parentQuestion = null;
        inputQuestionList.forEach(individualQuestion => {
            if (!individualQuestion.parentQuestionId) {
                parentQuestion = this.resetParentQuestion();
                parentQuestion.parent = individualQuestion;
                returnList.push(parentQuestion);
            } else {
                parentQuestion.child.push(individualQuestion);
            }
        });

        return returnList;
    }
    private resetParentQuestion() {
        return cloneDeep({
            parent: null,
            child: []
        })
    }

    isRevisionNeeded(revisionList: any[]): boolean {
        if (revisionList) {
            return find(revisionList, function (o) { return o.currentInd === 'C' && o.status === 'R'; }) ? true : false;
        }
        return false;
    }

    viewQuestionDetails(parentQuestionType: string, parentQuestionId: string) {
        let questionType = null;
        switch (parentQuestionType) {
            case 'REG': {
                questionType = 'regular';
                break;
            }
            case 'CNTNGNCY': {
                questionType = 'contingency';
                break;
            }
            case 'CNTNGNCYF': {
                questionType = 'contingency-file';
                break;
            }
        }
        this.utils.navigateTo([questionType, parentQuestionId], true, true);
    }

    getQuestionHeaderText(attachment: string, attachachmentCode: string, sectionCode: string, term: string,
        attachachmentText: string, sectionText: string) {

        let returnString = "";

        returnString = this.checkNullAndAppand(returnString, attachment);
        returnString = this.checkNullAndAppand(returnString, attachachmentCode) + '.';
        returnString = this.checkNullAndAppand(returnString, sectionCode) + '.';
        returnString = this.checkNullAndAppand(returnString, term) + '.';
        returnString = this.checkNullAndAppand(returnString, attachachmentText) + '.';
        returnString = this.checkNullAndAppand(returnString, sectionText);

        return returnString;
    }

    private checkNullAndAppand(parentString: string, tobeAppendend: string) {
        if (tobeAppendend) {
            return parentString + tobeAppendend;
        }
        return parentString;
    }

    private calculateShowRevision(inputQuestionList: any[]) {
        let filteredList = filter(inputQuestionList, function (question: any) {
            if (question.reviewList && question.reviewList.length > 0 && find(question.reviewList, { "currentInd": "C", "status": "R" })) {
                return question;
            }

        });

        return (filteredList && filteredList.length > 0);
    }

    calculateshowRevision(question: any) {
        if(question.revisionIndicator === 'Y')
            return true;
        else
            return false;
    }
}
