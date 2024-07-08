import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  catchError,
  filter,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from "rxjs";
import { CoursesService } from "./courses.service";
import { Author, Course, CourseDTO } from "./model/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  private courses$$ = new BehaviorSubject<CourseDTO[]>([]);
  private authors$$ = new BehaviorSubject<Author[]>([]);
  private selectedCourse$$ = new BehaviorSubject<CourseDTO>({});
  private selectedAuthor$$ = new BehaviorSubject<Author>({});

  isLoading$ = this.isLoading$$.asObservable();

  courses$ = this.courses$$.asObservable();
  selectedCourse$ = this.selectedCourse$$.asObservable();
  selectedAuthor$ = this.selectedAuthor$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  private fetchAuthorsForCourse(course: any): Observable<any> {
    if (course.authors && course.authors.length > 0) {
      return forkJoin(
        course.authors.map((authorId: string) =>
          this.coursesService.getAuthorById(authorId)
        )
      ).pipe(
        map((authors: any) => {
          course.authors = authors;
          return course;
        })
      );
    }
    return of(course);
  }

  private handleCourses(courses: any[]): Observable<any[]> {
    if (courses.length > 0) {
      return forkJoin(
        courses.map((course) => this.fetchAuthorsForCourse(course))
      );
    }
    return of([]);
  }

  getAll() {
    this.isLoading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(
        switchMap(this.handleCourses.bind(this)),
        tap(this.handleSuccess.bind(this)),
        catchError(this.handleError.bind(this))
      )
      .subscribe();
  }

  private handleSuccess(courses: any) {
    this.courses$$.next(courses);
    this.isLoading$$.next(false);
  }

  private handleError(error: any) {
    console.error("Error loading courses:", error);
    this.isLoading$$.next(false);
    return throwError(() => new Error("Error loading courses: " + error));
  }

  createCourse(course: Course) {
    this.isLoading$$.next(true);
    this.coursesService
      .createCourse(course)
      .pipe(
        tap((course) => {
          this.courses$$.next([...this.courses$$.value, course]);
          this.isLoading$$.next(false);
        }),
        catchError((error) => {
          this.isLoading$$.next(false);
          throw "Error loading course: " + error;
        })
      )
      .subscribe();
  }

  getCourse(courseId: string) {
    this.coursesService
      .getCourse(courseId)
      .pipe(
        switchMap((course) => {
          if (course.authors && course.authors.length > 0) {
            return forkJoin(
              course.authors.map((authorId: string) =>
                this.coursesService.getAuthorById(authorId)
              )
            ).pipe(
              map((authors: any) => {
                course.authors = authors;
                return course;
              })
            );
          }
          return of(course);
        }),
        tap((course) => this.selectedCourse$$.next(course)),
        catchError((error) => {
          console.error("Error loading course:", error);
          return of(null);
        })
      )
      .subscribe();
  }

  editCourse(id: string, course: Course): void {
    this.isLoading$$.next(true);
    this.coursesService
      .editCourse(id, course)
      .pipe(
        tap((updatedCourse) => {
          const updatedCourses = this.courses$$.value.map((course) =>
            course.id === id ? updatedCourse : course
          );
          this.courses$$.next(updatedCourses);
          this.isLoading$$.next(false);
        }),
        catchError((error) => {
          console.error("Error deleting course:", error);
          this.isLoading$$.next(false);
          throw "Error deleting course: " + error;
        })
      )
      .subscribe();
  }

  deleteCourse(id: string): void {
    this.isLoading$$.next(true);
    this.coursesService
      .deleteCourse(id)
      .pipe(
        tap(() => {
          const filteredCourses = this.courses$$.value.filter(
            (course) => course.id !== id
          );
          this.courses$$.next(filteredCourses);
          this.isLoading$$.next(false);
        }),
        catchError((error) => {
          console.error("Error deleting course:", error);
          this.isLoading$$.next(false);
          throw "Error deleting course: " + error;
        })
      )
      .subscribe();
  }

  filterCourses(filters: {
    title?: string;
    description?: string;
    duration?: number;
    creationDate?: string;
  }) {
    this.isLoading$$.next(true);
    this.coursesService
      .filterCourses(filters)
      .pipe(
        switchMap(this.handleCourses.bind(this)),
        tap(this.handleSuccess.bind(this)),
        catchError(this.handleError.bind(this))
      )
      .subscribe();
  }

  getAllAuthors() {
    this.isLoading$$.next(true);
    this.coursesService
      .getAllAuthors()
      .pipe(
        tap((authors) => {
          this.authors$$.next(authors);
          this.isLoading$$.next(false);
        }),
        catchError((error) => {
          this.isLoading$$.next(false);
          throw "Error loading authors: " + error;
        })
      )
      .subscribe();
  }

  createAuthor(name: string) {
    this.isLoading$$.next(true);
    return this.coursesService.createAuthor(name).pipe(
      tap((author) => {
        this.authors$$.next([...this.authors$$.value, author]);
        this.selectedAuthor$$.next(author);
        this.isLoading$$.next(false);
      }),
      catchError((error) => {
        this.isLoading$$.next(false);
        throw "Error creating author: " + error;
      })
    );
  }

  getAuthorById(id: string) {
    this.isLoading$$.next(true);
    this.coursesService
      .getAuthorById(id)
      .pipe(
        tap((author) => {
          this.selectedAuthor$$.next(author);
          this.isLoading$$.next(false);
        }),
        catchError((error) => {
          this.isLoading$$.next(false);
          throw "Error loading author: " + error;
        })
      )
      .subscribe();
  }
}
