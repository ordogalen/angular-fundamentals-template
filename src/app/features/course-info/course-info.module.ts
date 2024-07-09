import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseInfoComponent } from './course-info.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [CourseInfoComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CourseInfoModule { }
