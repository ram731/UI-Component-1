import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommonPageModule } from '../common/common.module';

import { basicInfoRouting } from './basicInfo.routes';


@NgModule({

    imports: [
        CommonModule,
        RouterModule,
        basicInfoRouting,
        ReactiveFormsModule,
        SharedModule,
        CommonPageModule,
    ],

    declarations: [
    ],

    exports: [],

    providers: []
})
export class BasicInfoModule { }
