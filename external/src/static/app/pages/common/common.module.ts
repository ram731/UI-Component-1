import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule  } from '@angular/forms';
import { commonRouting } from './common.routes';
import { CertifyComponent } from './certify/certify.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { WhatsNeededComponent } from './whats-needed/whats-needed.component';
import { AdditionalCommentsComponent } from './additional-comments/additional-comments.component';
import { ComponentPageModule } from '../components/componet.module';
import { SharedModule } from '../../shared/shared.module';
import { EachQuestion } from './question-list/each-question/each-question.component';



export const metadata = {

    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        commonRouting,
        ComponentPageModule,
        SharedModule,
        /* MyDEQCoreModule */
    ],
    declarations: [
            
        CertifyComponent,
        ConfirmationComponent,       
        QuestionListComponent,        
        AdditionalCommentsComponent,      
        WhatsNeededComponent,
        EachQuestion,       
    ],
    exports: [       
        CertifyComponent,
        ConfirmationComponent,       
        QuestionListComponent,        
        AdditionalCommentsComponent,       
        WhatsNeededComponent,
        EachQuestion       
    ]
};
@NgModule(metadata)
export class CommonPageModule{}



