import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonPageModule } from './common/common.module';

@NgModule({

    imports: [
        CommonModule,
        RouterModule,
        CommonPageModule
    ]

})
export class PageModule {}



