import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonPageModule } from './common/common.module';

export const metadata = {

    imports: [
        CommonModule,
        RouterModule,
        CommonPageModule
    ]

};
@NgModule(metadata)
export class PageModule {}



