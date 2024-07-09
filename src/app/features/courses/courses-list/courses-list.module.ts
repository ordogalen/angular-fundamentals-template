import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesComponent } from '../courses.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class CoursesListModule { }
