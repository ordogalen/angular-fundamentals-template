import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";
import {
  getAllCourses,
  getCourse,
  getErrorMessage,
  isAllCoursesLoadingSelector,
  isSearchingStateSelector,
  isSingleCourseLoadingSelector,
} from "./courses.selectors";
import {
  requestAllCourses,
  requestCreateCourse,
  requestDeleteCourse,
  requestEditCourse,
  requestFilterCourse,
  requestSingleCourse,
} from "./courses.actions";
import { Course } from "@app/services/model/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  isAllCoursesLoading$ = this.store.select(isAllCoursesLoadingSelector);
  isSingleCourseLoading$ = this.store.select(isSingleCourseLoadingSelector);
  isSearchingState$ = this.store.select(isSearchingStateSelector);
  allCourses$ = this.store.select(getAllCourses);
  course$ = this.store.select(getCourse);
  errorMessage$ = this.store.select(getErrorMessage);

  constructor(private store: Store<CoursesState>) {}

  getAllCourses() {
    return this.store.dispatch(requestAllCourses());
  }

  getSingleCourse(id: string) {
    return this.store.dispatch(requestSingleCourse({ id }));
  }

  getFilteredCourse(title: string) {
    return this.store.dispatch(requestFilterCourse({ title }));
  }

  editCourse(id: string, course: Course) {
    this.store.dispatch(requestEditCourse({ id, course }));
  }

  createCourse(course: Course) {
    this.store.dispatch(requestCreateCourse({ course }));
  }

  deleteCourse(id: string) {
    this.store.dispatch(requestDeleteCourse({ id }));
  }
}
