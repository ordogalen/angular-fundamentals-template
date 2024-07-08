import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CourseDTO } from "@app/services/model/course.model";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  course$ = this.coursesStoreService.selectedCourse$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesStoreService: CoursesStoreService
  ) {}

  ngOnInit() {
    const courseId = this.activatedRoute.snapshot.paramMap.get("id");
    if (courseId) {
      this.coursesStoreService.getCourse(courseId);
    }
  }
}
