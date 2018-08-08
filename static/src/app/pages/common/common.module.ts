import 'reflect-metadata';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HelloWorldComponent } from './helloworld/helloworld.component';
import { MyDeqComponentModule } from '../../shared/lib/component-config/componentModule';

@NgModule({

    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        HelloWorldComponent
    ],
    exports: [
        HelloWorldComponent
    ],
    entryComponents: [
        HelloWorldComponent
    ]
})
export class CommonPageModule extends MyDeqComponentModule {}



