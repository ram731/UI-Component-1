import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermitInfoComponent } from '../common/permit-info/permit-info.component';
import { SelectCompanyComponent } from '../common/select-company/select-company.component';



export const BasicInfoRoute: Routes = [

    {
        path: 'basic-info',
        children: [
            {
                path: 'permit-info',
                component: PermitInfoComponent,
                data: { title: 'Select Permit', placeBarRequired: true, showSaveAndExit: false }
            },
            {
                path: 'select-company',
                component: SelectCompanyComponent,
                data: { title: 'Select Company', placeBarRequired: true, showSaveAndExit: false, showReviewComments: false }
            }
        ]
    }
];

export const basicInfoRouting: ModuleWithProviders = RouterModule.forRoot(BasicInfoRoute);
