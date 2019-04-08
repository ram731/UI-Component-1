import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PageFooterComponent } from './page-footer/page-footer.component';

export const metadata = {

    imports: [        
        ReactiveFormsModule,
        CommonModule,
        NgbModule
    ],
    declarations: [      
        PageFooterComponent,
    ],
    exports: [        
        PageFooterComponent,
    ]
};
@NgModule(metadata)
export class ComponentPageModule{}



