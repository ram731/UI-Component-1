import { Component, OnInit, ViewChild } from '@angular/core';
import { Utils } from '../../shared/Utils';
import { MyDeqErrorHandler } from '../../shared/errorHandler';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ManagerService } from '../../service/manager.service';
import * as _ from 'lodash';
import { BaseControllerComponent } from '../../core/basecontroller.component'; 
import {InventoryListText } from './inventory-list-page-text';

import { NgbPopover } from '@ng-bootstrap/ng-bootstrap/popover/popover';
import { LoggerService } from '../../shared/lib/logger/logger-service.component';



@Component({
    selector: 'manager-inventory-list',
    templateUrl: 'inventory-list.component.html'
})

export class InventoryListComponent extends  BaseControllerComponent implements OnInit {

   
    errorsList: any[] = [];
    dbSearchForm: FormGroup;
    fullList: any[] = [];
    requestList: any[] = [];
    requestType: string;
    //pageText: any = {};
    showAnnualReport: boolean;
    showAddModal: string;
    searchKeys: Map<string, string[]> = new Map<string, string[]>();
    placeHolderText: string;
    permitType: string = 'A';
    searchText: string = '';
    //sample:any[] = [{"id":"1","root_id":"1","seq":"1","level":"1","qtext":"Q1"},{"id":"5","root_id":"1","seq":"1","level":"2","qtext":"Q1.1"},{"id":"6","root_id":"1","seq":"2","level":"2","qtext":"Q1.2"},{"id":"7","root_id":"1","seq":"3","level":"2","qtext":"Q1.3"},{"id":"8","root_id":"1","seq":"1","level":"3","qtext":"Q1.3.1"},{"id":"9","root_id":"1","seq":"2","level":"3","qtext":"Q1.3.2"},{"id":"10","root_id":"1","seq":"4","level":"2","qtext":"Q1.4"},{"id":"11","root_id":"1","seq":"5","level":"2","qtext":"Q1.5"}];
    
    //sample: any = { 'id': '1', 'level': '1', 'seq': '1', 'qtext': 'Q1', 'child': [{ 'id': '5', 'level': '2', 'seq': '1', 'qtext': 'Q1.1', 'child': [] }, { 'id': '6', 'level': '2', 'seq': '2', 'qtext': 'Q1.2', 'child': [] }, { 'id': '7', 'level': '2', 'seq': '3', 'qtext': 'Q1.3', 'child': [{ 'id': '8', 'level': '3', 'seq': '1', 'qtext': 'Q1.3.1', 'child': [] }, { 'id': '9', 'level': '3', 'seq': '2', 'qtext': 'Q1.3.2', 'child': [] }] }, { 'id': '10', 'level': '2', 'seq': '4', 'qtext': 'Q1.4', 'child': [] }, { 'id': '11', 'level': '2', 'seq': '5', 'qtext': 'Q1.5', 'child': [] }] };
    
    constructor(
        public utils: Utils,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private service: ManagerService,        
        protected errorHandler: MyDeqErrorHandler,
        private logger:LoggerService
       ) {
        super(errorHandler, new InventoryListText());
        this.dbSearchForm = this.formBuilder.group({
            searchByKey: ['-1'],
            searchByValue: ['']
        });
        route.params
            .subscribe(params => {
                this.requestType = params['requestType'];
                //this.pageText = this.contentService.getRequestListPageText(requestType);
                this.loadRequestList(this.requestType);
            });
    }

    ngOnInit() {
    }

    loadRequestList(requestType: string) {
        this.addSearchKeys(this.requestType);
        this.errorsList = [];
        this.requestList = [];
        this.fullList = [];
        if (requestType) {
            let serviceName = this.setProcessName(requestType);
            this.service.getInventoryList(serviceName).subscribe(
                response => {
                    if (response) {
                        this.requestList = response;
                        this.fullList = this.requestList;
                    }
                },
                error => {
                    this.errorsList = this.errorHandler.getErrors(error);
                });
        }
    }
    
    deleteQuestion(deleteObject: any) {
        this.errorsList = [];
        if(deleteObject.questionId) {
           /*  this.service.deleteQuestion(deleteObject.questionId).subscribe(
                response => {              
                        this.loadRequestList(this.requestType);              
                },
                error => {
                    this.errorsList = this.errorHandler.getErrors(error);
                }); */
        }
    }


    download() {
        let itemsFormatted = [];
        let headers = {};
        let fileTitle = '';
        if(this.requestType === 'permitinventory') {
             fileTitle = 'Permit Inventory';
             headers = {
                ParentLTF: 'Parent LTF',
                LTFStatus: 'LTF Status',
                LTFIssueDate: 'LTF Issue Date',
                LTFExpDate: 'LTF Exp Date',              
                CustomerID: 'Customer ID',
                PlaceId: 'Place Id',
                PlaceName: 'Place Name',
                Company: 'Company',
                PermitCategory: 'Permit Category',
                LastApprovalDate: 'Last Approval Date',
                Status:'Status'
        };

        // format the data
        this.fullList.forEach((item) => {
            itemsFormatted.push({
                ParentLTF: item.permitId,
                LTFStatus: item.permitStatus,
                LTFIssueDate: item.permitIssueDate,
                LTFExpDate: item.permitExpDate,             
                CustomerID: item.azuCusIdno,
                PlaceId: item.placeId,
                PlaceName: item.placeName,
                Company: item.companyName,
                PermitCategory: item.applicationType,
                LastApprovalDate: item.lastApprovalDate,
                Status: item.templateStatus,
            });
        });

        } else if (this.requestType === 'pendingcc' || this.requestType === 'reviewedcc') {
             fileTitle = 'COMPLIANCE CERTIFICATION';
             headers = {
                ParentLTF: 'Permit #',
                PlaceId: 'Place Id',
                PlaceName: 'Place Name',
                Company: 'Company',
                reportingPeriod:'Reporting Period',
                dueDate: 'Due Date',
                submitDate:'Submit Date',
                Type: 'Type',
                AssignedEngineer:'Assigned Engineer',
                Status:'Status',
                DaysinReview:'Days in Review'
        };
        // format the data
        this.fullList.forEach((item) => {
            itemsFormatted.push({
                ParentLTF: item.ltfId,           
                PlaceId: item.placeId,
                PlaceName: item.placeName,
                Company: item.companyName,
                reportingPeriod:item.reportingPeriodText,
                dueDate: item.reportingDueDate,
                submitDate:item.reportingSubmitDate,
                Type: item.reqType,
                AssignedEngineer:item.assignedEngg,
                Status:item.globalReqStatus,
                DaysinReview:item.daysInReview
            });
        });

        }
         

       // or 'my-unique-title'
       this.exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
    }

    convertToCSV(objArray) {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        //console.log(array);
        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let index in array[i]) {
                 
                if (line != '') 
                line += ',';
                if(array[i][index] === null || array[i][index] === '') {
                    array[i][index] = "";
                }
                /* if(array[i][index]) { */
                    //array[i][index] = array[i][index].replace(/,/g, '-');;
                    array[i][index] = '"' + array[i][index] + '"';
                /* } */
                line += array[i][index];
            }

            str += line + '\r\n';
        }
        //console.log(str);
        return str;
    }

    exportCSVFile(headers, items, fileTitle) {
        if (headers) {
            items.unshift(headers);
        }

        // Convert Object to JSON
        const jsonObject = JSON.stringify(items);

        const csv = this.convertToCSV(jsonObject);

        const exportedFilenmae = fileTitle + '.csv' || 'export.csv';

       const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    updateAddQuestionModal() {
     //   this.addQBModal.showAddModal = 'Y';
    }

    setProcessName(requestType: string) {
        if(requestType === 'questionbank') {
            this.utils.processName = 'qb';
            return '/getQuestionBank';
        }           
        else if(requestType === 'permitinventory') {
            this.utils.processName = 'template';
            return '/getPermitList/'+this.permitType;
        }else {
            this.utils.processName = 'cc';
            if(this.requestType === 'pendingcc') 
                return '/pendingcc';
            else if(this.requestType === 'reviewedcc')
                return '/reviewedcc' ;
        }
            
    }

    checkIcon(iconIndicator: string) {
        if(iconIndicator === 'N')
            return false;
        else
            return true;
    }

    displayContent(result: any, colDatakey: string) {
        if(colDatakey === 'questionTags' && result) {
            let returnSring = '';
            for(let i=0; i < result.length; i++){
                returnSring = returnSring  + result[i].description + ' | ';
            }
            return returnSring;
        } else if(colDatakey != '' && result)
            return result;
            else
            return '';
    }

  

    addSearchKeys( requestType: string) {
        if(requestType === 'questionbank') {
            this.searchKeys.set("questionId",[]);
            this.searchKeys.set("questionText",[]);
            this.searchKeys.set("questionTags",['description']);
            this.searchKeys.set("questionStatus",[]);
            this.placeHolderText = "Search by: Keyword or Tag";
            this.searchText = '';
        } else if(requestType === 'permitinventory') { 
            this.searchKeys.set("permitId",[]);
            this.searchKeys.set("placeName",[]);
            this.searchKeys.set("placeId",[]);
            this.searchKeys.set("companyName",[]);
            this.searchKeys.set("applicationType",[]);
            this.searchKeys.set("templateStatus",[]);
            this.searchKeys.set("lastApprovalDate",[]);
            this.searchKeys.set("permitExpDate",[]);
            this.placeHolderText = "Search By LTF#, PlaceId, PlaceName, Company, Application Type, Status, Last Approved Date";
            this.searchText = '';
        } else {
            this.placeHolderText = "Search By Place ID, Permit #, Due Date, Submit Date, Type, Assigned Engineer, Status";
            this.searchKeys.set("ltfId",[]);
            this.searchKeys.set("placeName",[]);
            this.searchKeys.set("placeId",[]);
            this.searchKeys.set("companyName",[]);
            this.searchKeys.set("assignedEngg",[]);
            this.searchKeys.set("reportingSubmitDate",[]);
            this.searchKeys.set("reqType",[]);
            this.searchKeys.set("reportingDueDate",[]);
            this.searchKeys.set("reportingSubmitDate",[]);
            this.searchKeys.set("globalReqStatus",[]);
            this.searchText = '';
        }

    }

    updatedSearchList(value: any[]) {
        
        this.requestList = value;
    }

    navigateToLink(result : any) {
        if(this.requestType === 'questionbank') {
            this.utils.navigateTo(['qb','add-update-question', result.questionId], false);
        } else if (this.requestType === 'permitinventory') {
            this.utils.navigateTo(['template','aircc-detail', result.permitId], false);
        } else {
            this.utils.navigateTo(['cc','review', result.appId, result.reqId], false);
        }
    }
    
    checkDelete(colName : string) {
        if(colName === 'Delete')
            return true;
        else
            return false;
    }
    
    popOpen(p: NgbPopover, functionality: string): void {
        if(functionality != 'delete') {
            p.popoverClass ='pop-over-class';
            p.placement = 'top-left';
        }
       
        p.toggle();
    }
    
     popClose(p: NgbPopover){     
       p.close();
    }

    loadPermits() {
        if(this.permitType === 'A') {
            this.permitType = 'I';
        } else {
            this.permitType = 'A';
        }
            
        this.loadRequestList(this.requestType);
    }

    checkClick(result: any) {
        if((this.requestType === 'pendingcc' || this.requestType === 'reviewedcc') && (result.permitStatus === 'INPRGRS' || result.permitStatus === '~')) 
            return true;
        else 
            return false;
    }

}
