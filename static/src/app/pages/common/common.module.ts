import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MyDeqComponentModule } from '../../shared/lib/component-config/componentModule';
import { PermitInfoComponent } from './permit-info/permit-info.component';
import { SelectCompanyComponent } from './select-compony/select-company.component';

export const metadata = {

    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        PermitInfoComponent,
        SelectCompanyComponent
    ],
    exports: [
        PermitInfoComponent,
        SelectCompanyComponent
    ],
    entryComponents: [
        PermitInfoComponent,
        SelectCompanyComponent
    ]
};
@NgModule(metadata)
export class CommonPageModule extends MyDeqComponentModule {}



