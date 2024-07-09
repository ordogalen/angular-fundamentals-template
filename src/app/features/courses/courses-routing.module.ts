import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseFormComponent } from '@app/shared/components';
import { CourseInfoComponent } from '../course-info/course-info.component';
import { AdminGuard } from '@app/user/guards/admin.guard';

const routes: Routes = [
    { path: '', component: CoursesComponent },
    { path: 'courses/add', component: CourseFormComponent, canActivate:[AdminGuard]},
    { path: 'courses/:id', component: CourseFormComponent, canActivate:[AdminGuard]},
    { path: 'courses/edit/:id', component: CourseFormComponent, canActivate:[AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
