import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhatsNeededComponent } from './whats-needed/whats-needed.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { AdditionalCommentsComponent } from './additional-comments/additional-comments.component';
import { CertifyComponent } from './certify/certify.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';


export const CommonRoute: Routes = [

    {
        path: 'cc',
        children: [        
           
            {
                path: 'whats-needed',
                component: WhatsNeededComponent,
                data: { title: 'AIRCC-WHATSNEEDED', placeBarRequired: true, showSaveAndExit: false, showReviewComments: false }
            },
            {
                path: 'question-list',
                component: QuestionListComponent,
                data: { title: 'AIRCC-QUESTIONLIST', placeBarRequired: true, showSaveAndExit: true, showReviewComments: false }
            },
            {
                path: 'additional-comments',
                component: AdditionalCommentsComponent,
                data: { title: 'AIRCC-ADDITIONAL-COMMENT', placeBarRequired: true, showSaveAndExit: true, showReviewComments: false }
            },
            {
                path: 'certify',
                component: CertifyComponent,
                data: { title: 'AIRCC-CERTIFY', placeBarRequired: true, showSaveAndExit: false, showReviewComments: false }
            },
            {
                path: 'confirmation',
                component: ConfirmationComponent,
                data: { title: 'AIRCC-CONFIRMATION', placeBarRequired: false, showSaveAndExit: false, showReviewComments: false }
            }
            
        ]
    }
];

export const commonRouting: ModuleWithProviders = RouterModule.forRoot(CommonRoute);
