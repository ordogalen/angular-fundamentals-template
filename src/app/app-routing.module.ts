import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { CoursesComponent } from './features/courses/courses.component';
import { CourseInfoComponent } from './features/course-info/course-info.component';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';

const routes: Routes = [
    {path: "login", component: LoginFormComponent, canActivate: [NotAuthorizedGuard]},
    {path: "register", component: RegistrationFormComponent, canActivate: [NotAuthorizedGuard]},
    {path: "courses", component: CoursesComponent, canActivate: [AuthorizedGuard] },
    {path: "", component: CoursesComponent, canActivate: [AuthorizedGuard] },
    {path: "courses/add", component: CourseFormComponent, canActivate: [AdminGuard] },
    {path: "courses/:id", component: CourseInfoComponent, canActivate: [AuthorizedGuard] },
    {path: "courses/edit/:id", component: CourseFormComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }