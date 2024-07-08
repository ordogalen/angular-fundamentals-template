import { Component, OnDestroy, OnInit } from "@angular/core";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CourseDTO } from "@app/services/model/course.model";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  courses: CourseDTO[] = [];
  isAdmin: boolean = false;
  isLoading: boolean = false;

  constructor(
    private coursesStoreService: CoursesStoreService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.coursesStoreService.getAll();

    const coursesSubscription = this.coursesStoreService.courses$.subscribe(
      (courses) => {
        this.courses = courses;
        this.isLoading = false;
        console.log("Courses loaded:", courses);
      },
      (error) => {
        console.error("Failed to load courses", error);
        this.isLoading = false;
      }
    );

    const adminSubscription = this.userStoreService.isAdmin$.subscribe(
      (isAdmin) => {
        this.isAdmin = isAdmin;
      },
      (error) => {
        console.error("Failed to determine admin status", error);
      }
    );

    this.subscriptions.add(coursesSubscription);
    this.subscriptions.add(adminSubscription);
  }

  filterCourses(event: any) {
    this.coursesStoreService.filterCourses({ title: event });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
