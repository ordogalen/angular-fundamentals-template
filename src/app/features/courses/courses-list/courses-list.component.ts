import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CourseDTO } from "@app/services/model/course.model";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  @Input() courses!: any[];
  @Input() editable: boolean | null = false;

  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

  constructor(
    private router: Router,
    private coursesStoreService: CoursesStoreService
  ) {}

  handleShowCourse(courseId: string) {
    this.router.navigate(["/courses/" + courseId]);
  }

  handleEditCourse(courseId: string) {
    this.router.navigate(["/courses/edit/" + courseId]);
  }

  handleDeleteCourse(courseId: string) {
    this.coursesStoreService.deleteCourse(courseId);
  }
}
