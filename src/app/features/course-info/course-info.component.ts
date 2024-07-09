import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CourseDTO } from "@app/services/model/course.model";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  course$ = this.coursesFacade.course$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesFacade: CoursesStateFacade
  ) {}

  ngOnInit() {
    const courseId = this.activatedRoute.snapshot.paramMap.get("id");
    if (courseId) {
      this.coursesFacade.getSingleCourse(courseId);
    }
  }
}
