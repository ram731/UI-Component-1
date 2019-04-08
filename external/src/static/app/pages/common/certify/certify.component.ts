import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../../../shared/Utils';
import { BasePathController } from '../../components/base-path-component.component';
import { AppService } from '../../../service/app.service';
import { MyDeqErrorHandler } from '../../../core/errorHandler';
import { LoggerService } from '../../../shared/lib/logger/logger-service.component';
import { PagecontentCertify } from './certify.resourcebundle';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../../../../environments/environment';

const contextPath = environment.contextPath;
@Component({
    selector: 'certify',
    templateUrl: './certify.component.html'
})

export class CertifyComponent extends BasePathController {

    readToCertifyForm: FormGroup;
    modelerror: any[] = [];
    modelerrorMsg: any[] = [];
    accLock = false;
    certifyText: string;
    challengeQuestion: any;
    ars = { header: '', bodyCopy: '' };
    readyToCertify: boolean;
    chkClarifyStatement: boolean;
    accLocModal: any;
    constructor(protected activatedRoute: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler,
        private logger: LoggerService,
        protected modalService: NgbModal) {
        super(activatedRoute, formBuilder, utils, appService, errorHandler, new PagecontentCertify());
        this.setPageLoadServiceName("certify");

    }

    onGetResponse(response: any): void {
        this.challengeQuestion = response.challengeQuestion;
        if (response.message) {
            response.message.forEach((certifyText) => {
                if (this.utils.regexCompare(certifyText.heading, '(Certify)')) {
                    this.certifyText = certifyText.text;
                } else {
                    this.ars.header = certifyText.heading;
                    this.ars.bodyCopy = certifyText.text;
                }
            });
            this.readyToCertify = true;
        }
        if(response.pathName) {
            this.utils.setPageTitle(response.pathName);
        }

    }

    ngOnInit() {
        super.ngOnInit();
        this.readToCertifyForm = this.formBuilder.group({
            booleanAnswer: new FormControl(null),
        });


    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            answer: new FormControl(null),
            certify: new FormControl(null)
        });
    }

    /* continxxueClick(accLocModal){
        this.logger.info('--',this.accLocModal);
        this.utils.openNGBootstrapModal(accLocModal);
    } */
    returnToMyApp = (form: any, accLocModal) => {
        this.modelerror = [];
        this.modelerrorMsg = [];
        this.accLocModal = accLocModal;
        let putObj = {
            putObject: form,
            serviceURL: 'wanttocertify',
            successcallBack: function () {
                if (form.booleanAnswer === 'Y') {
                    this.readyToCertify = false;
                } else {
                    window.location.href = window.location.origin + '/mydeq/my-application';
                }
            }.bind(this),

            errorcallBack: function (error) {
                this.modelerrorMsg = this.errorHandler.getErrors(error);
                this.modelerror['booleanAnswer'] = true;
            }.bind(this),

        }
        this.additionalPutCall(putObj);
    }

    backToSummary() {
        this.utils.navigateTo(['summary'], true, true);
    }

    createPutObject(formData: any) {
        console.log('-- formData-',formData);
        if (this.accLock) {
            this.utils.openNGBootstrapModal(this.accLocModal);
            return;
        }
        let newPutObj = {
            chkClarifyStatement:formData.certify,
            challengeQuestion:{
                answer:formData.answer,
                question:this.challengeQuestion.question,
                questionSetId:this.challengeQuestion.questionSetId
            }
        };
        console.log('-- newPutObj-',newPutObj);
        return newPutObj;
    }
    onPutError(error) {
        try {
            if (error.noOfAttempt === 5) {
                this.accLock = true;
                this.utils.openNGBootstrapModal(this.accLocModal);
                return;
            }
        } catch (e) { }
        this.challengeQuestion = (error && error.challengeQuestion) ? error.challengeQuestion : this.challengeQuestion;
        this.errorsList = this.errorHandler.getErrors(error);
        this.errorFields = this.errorHandler.getErrorFields(error);
    }
    exitUser = () => {
        window.location.href = window.location.origin + contextPath + '/logout';
    }
}
