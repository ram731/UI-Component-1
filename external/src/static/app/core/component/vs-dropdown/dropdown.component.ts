import { Component, Output, EventEmitter, forwardRef, Input } from '@angular/core';
import { NgbDropdownConfig, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectDropDown } from './SelectDropDown.datatype';
import {find,filter} from 'lodash-es';

const DROPDOWN_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => VSDropdownComponent),
    multi: true
};

@Component({
    selector: 'vs-dropdown',
    templateUrl: './dropdown.component.html',
    providers: [DROPDOWN_VALUE_ACCESSOR]
})
export class VSDropdownComponent implements ControlValueAccessor {

    @Input() multiSelect = false;
    @Input() readonly = false;
    @Input() showAlert: boolean | undefined;
    @Input() itemList: any[] = [];

    @Output() itemSelected = new EventEmitter();

    isVisible = false;
    title = '';
    selectedItemIds: string[] = [];
    currentSelectedItem: any;
    selectedItems: any[] = [];
    displayList: any[] = [];

    errorsList: any[];
    searchFilterText = '';

    constructor(config: NgbDropdownConfig) {
        // config.autoClose = true;
    }

    writeValue(value: any): void {
        if (value !== undefined && value !== null) {
            let d = { vsCode: '', vsDescriptiveName: ''};
            if (value instanceof String) {
                d = this.getItem(value);
            } else {
                d = value;
            }
            this.currentSelectedItem = new SelectDropDown();
            this.currentSelectedItem.description = d.vsCode + ' - ' + d.vsDescriptiveName;
        } else {
            this.currentSelectedItem = new SelectDropDown();
            this.currentSelectedItem.description = 'SELECT VALUE STREAM';
        }
        console.log(this.currentSelectedItem, value);
    }

    onModelChange: Function = (_change: any) => { };
    onModelTouched: Function = () => { };

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;
    }
    
    setDisabledState?(isDisabled: boolean): void {
        this.readonly = isDisabled;
    }

    getItem = (vsId: String) => {
        return find(this.itemList, ['vsId', vsId ]);
    }

    optionSeleted(dropDown: NgbDropdown, item: any) {
        this.itemSelected.emit(item);
        this.currentSelectedItem.description = item.vsCode + ' - ' + item.vsDescriptiveName;
        this.onModelChange(item.vsId);
        this.onModelTouched();
        dropDown.close();
    }

    clearSearch(event: Event) {
        event.stopPropagation();
        this.searchFilterText = '';
        this.displayList = this.itemList;
    }

    searchFilter(event: Event) {
        if (!this.searchFilterText || this.searchFilterText === '') {
            this.displayList = this.itemList;
            return;
        }
        const regularExp = new RegExp('(' + this.searchFilterText + ')', 'i');

        this.displayList = filter(this.itemList, function (vs) {
            return (
                vs.vsDescriptiveName && vs.vsDescriptiveName.match(regularExp)
            );
        });
    }

    dropDownChange(event) {
         if (event) {
            this.displayList = this.itemList;
        }
    }

}
