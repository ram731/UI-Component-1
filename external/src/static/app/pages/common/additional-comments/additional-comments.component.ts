import { Component} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../../../shared/Utils';
import { AppService } from '../../../service/app.service';
import { MyDeqErrorHandler } from '../../../core/errorHandler';
import { LoggerService } from '../../../shared/lib/logger/logger-service.component';
import { PagecontentAdditionalComments } from './additional-comments.resourcebundle';
import { BasePathController } from '../../components/base-path-component.component';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover';

@Component({
    selector: 'additional-comments',
    templateUrl: './additional-comments.component.html'
})

export class AdditionalCommentsComponent extends BasePathController {

    showFileUpload: boolean = false;
    file1: any = null;
    file2: any = null;
    file3: any = null;
    file4: any = null;
    file5: any = null;
    file6: any = null;
    file7: any = null;
    file8: any = null;
    file9: any = null;
    file10: any = null;
    uploadedFileSize: number = 0;
    uploadedFiles = [];
    p: NgbPopover;
    fileDisableIndicator: boolean = false;
    constructor(protected activatedRoute: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected utils: Utils,
        protected appService: AppService,
        protected errorHandler: MyDeqErrorHandler,
        private logger: LoggerService
        ) {
        super(activatedRoute, formBuilder, utils, appService, errorHandler, new PagecontentAdditionalComments());
        this.setPageLoadServiceName("additionalComments");
        this.pageFooterDTL.rightButtonAction = () => {
            this.postPageContinue(this.pageForm ? this.pageForm.getRawValue() : new FormData())
        };

    }

    onGetResponse(getResponse: any): void {
        this.logger.debug('-- ', getResponse);
        if (getResponse.booleanAnswer) {
            this.pageForm.get('booleanAnswer').setValue(getResponse.booleanAnswer);
            this.pageForm.get('additionalComments').setValue(getResponse.additionalComments);
            this.showFileUpload = getResponse.booleanAnswer === 'Y';
        }
        if (getResponse.uploadedFiles) {
            this.uploadedFileSize = getResponse.uploadedFiles.length;
            this.logger.debug('---this.uploadedFileSize --', this.uploadedFileSize);
        }
        this.uploadedFiles = getResponse.uploadedFiles;
        if (this.uploadedFileSize > 0) {
            this.pageForm.get('booleanAnswer').setValue(getResponse.booleanAnswer);
        }
        this.isApprovedEdit(getResponse);
        this.mapExisingData();
    }

    createForm(): FormGroup {

        return this.formBuilder.group({
            booleanAnswer: new FormControl(null),
            additionalComments: new FormControl(null),
            file1: new FormControl(null),
            file2: new FormControl(null),
            file3: new FormControl(null),
            file4: new FormControl(null),
            file5: new FormControl(null),
            file6: new FormControl(null),
            file7: new FormControl(null),
            file8: new FormControl(null),
            file9: new FormControl(null),
            file10: new FormControl(null)
        });

    }
    uploadFile(event, i) {
        switch (i) {
            case 1:
                this.file1 = event.target.files[0];
                break;
            case 2:
                this.file2 = event.target.files[0];
                break;
            case 3:
                this.file3 = event.target.files[0];
                break;
            case 4:
                this.file4 = event.target.files[0];
                break;
            case 5:
                this.file5 = event.target.files[0];
                break;
            case 6:
                this.file6 = event.target.files[0];
                break;
            case 7:
                this.file7 = event.target.files[0];
                break;
            case 8:
                this.file8 = event.target.files[0];
                break;
            case 9:
                this.file9 = event.target.files[0];
                break;
            case 10:
                this.file10 = event.target.files[0];
                break;


        }
    }
    removeFile( i) {
        switch (i) {
            case 1:
                this.file1 = null;
                break;
            case 2:
                this.file2 = null;
                break;
            case 3:
                this.file3 = null;
                break;
            case 4:
                this.file4 = null;
                break;
            case 5:
                this.file5 = null;
                break;
            case 6:
                this.file6 = null;
                break;
            case 7:
                this.file7 = null;
                break;
            case 8:
                this.file8 = null;
                break;
            case 9:
                this.file9 = null;
                break;
            case 10:
                this.file10 = null;
                break;


        }
    }
    
    chooseFile = (id) => document.getElementById(id).click()

    createPutObject(formData: any) {

        if (formData.booleanAnswer) {
            return {
                booleanAnswer: formData.booleanAnswer === true ? 'Y' : 'N',
                additionalComments: formData.additionalComments
            }
        }

        return formData;
    }

    selectYesNo(userSelection) {
        if (userSelection == 'Y') {
            this.showFileUpload = true;
        } else {
            this.showFileUpload = false;

        }
    }

    protected openPopup(p: NgbPopover): void {
        p.toggle();
        this.p = p;
    }

    protected closePopup(p: NgbPopover) {
        p.close();
    }

    public userPopUpSelection(userSelection: string, index: number) {
        if ('Y' === userSelection) {
            this.appService.deleteServiceCall(this.uploadedFiles[index].fileDocId, 'deleteaddcommentfile').subscribe(
                response => {
                    this.uploadedFiles.splice(index, 1);
                    this.uploadedFileSize = this.uploadedFileSize - 1;
                },
                error => {
                    this.handleError(error);

                }
            );

        }
        this.closePopup(this.p);
    }
    createPostObject(form: any): FormData {
        this.logger.debug('--mks--', form);
        if (form.booleanAnswer && form.booleanAnswer == 'N') {
            this.file1 = null;
            this.file2 = null;
            this.file3 = null;
            this.file4 = null;
            this.file5 = null;
            this.file6 = null;
            this.file7 = null;
            this.file8 = null;
            this.file9 = null;
            this.file10 = null;
        }
        const formData: any = new FormData();
        formData.append('booleanAnswer', form.booleanAnswer ? form.booleanAnswer : '');
        formData.append('additionalComments', form.additionalComments ? form.additionalComments : '');
        if (this.file1) {
            this.logger.debug("Appendin file1", this.file1.name);
            formData.append('file1', this.file1, this.file1.name);
            this.logger.debug("FormD", formData);
        }
        if (this.file2) {
            formData.append('file2', this.file2, this.file2.name);
        }
        if (this.file3) {
            formData.append('file3', this.file3, this.file3.name);
        }
        if (this.file4) {
            formData.append('file4', this.file4, this.file4.name);
        }
        if (this.file5) {
            formData.append('file5', this.file5, this.file5.name);
        }
        if (this.file6) {
            formData.append('file6', this.file6, this.file6.name);
        }
        if (this.file7) {
            formData.append('file7', this.file7, this.file7.name);
        }
        if (this.file8) {
            formData.append('file8', this.file8, this.file8.name);
        }
        if (this.file9) {
            formData.append('file9', this.file9, this.file9.name);
        }
        if (this.file10) {
            formData.append('file10', this.file10, this.file10.name);
        }

        this.logger.debug('--- form data --', formData);
        return formData;
    }

    continuePostCall() {

    }

    mapExisingData() {
        if(this.model.reviewList && this.model.reviewList.length > 0){
            if(this.approveEditIndicator === 'N'){
                this.pageForm.get('booleanAnswer').disable();
                this.pageForm.get('additionalComments').disable();
                this.fileDisableIndicator = true;
            }    
        }
        else{
            this.approveEditIndicator = 'Y';
        }
    }

    performActionOnEdit() {
        this.pageForm.get('booleanAnswer').enable();
        this.pageForm.get('additionalComments').enable();
        this.fileDisableIndicator = false;
    }

    createUpdateSectionPutObject() {
        let review = {
            entityIdno: null
        }
        return review;
    }

    
    performActionOnEditError(error){    
        this.errorsList = this.errorHandler.getErrors(error);    
    }
}
