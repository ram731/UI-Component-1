import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MydeqFooterComponent } from './mydeq-footer/mydeq-footer.component';
import { MydeqHeaderComponent } from './mydeq-header/mydeq-header.component';
import { CommentsComponent } from './comment-section/comments.component';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],

  declarations: [
    MydeqFooterComponent,
    MydeqHeaderComponent,
    CommentsComponent
  ],

  exports: [
    MydeqFooterComponent,
    MydeqHeaderComponent,
    CommentsComponent
  ]
})
export class ComponentModule { }
