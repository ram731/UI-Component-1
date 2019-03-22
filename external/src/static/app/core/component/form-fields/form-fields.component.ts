import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
    selector: 'deq-form-field',
    templateUrl: 'form-fields.component.html'
})

export class FormFieldComponent {

    @Input() attributes: any;
    @Input() pageForm: FormGroup;
    @Input() errorFields: any[] = [];
    @Input() itemList: any[] = [];
    @Output() fileUploaded = new EventEmitter<any>();

    fileName: string;     

    constructor() { }

    ngOnInit() { }

    uploadFile(fileInput: any, field: string) {
        const file = fileInput.target.files[0];
        this.fileName = file.name;
        this.fileUploaded.emit({
            file: file,
            field: field
        });
    }

    removeFile(field: string) {
        this.fileName = undefined;
        this.fileUploaded.emit({
            file: null,
            field: field
        });
    }
}