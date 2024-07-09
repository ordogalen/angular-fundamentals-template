import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, forkJoin, map, Observable, of, switchMap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Author, Course, CourseDTO } from "./model/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<CourseDTO[]> {
    return this.http.get<{successful: boolean, result: any[]}>(`${environment.backend_uri}/courses/all`).pipe(
      switchMap(response => {
        if (response.successful && response.result.length > 0) {
          return forkJoin(
            response.result.map(course =>
              forkJoin(
                course.authors.map((authorId: string) => this.getAuthorById(authorId))
              ).pipe(
                map(authors => ({
                  ...course,
                  title: course.title,
                  description: course.description,
                  authors: authors,
                  duration: course.duration,
                }))
              )
            )
          );
        } else {
          return of([]);
        }
      }),
      catchError(error => {
        console.error('Error in getting courses:', error);
        return throwError(() => new Error("Error in getting courses: " + error.message));
      })
    );
  }

  createCourse(course: Course) {
    return this.http
      .post(environment.backend_uri + "/courses/add", course)
      .pipe(
        map((response: any) => {
          return response.result;
        }),
        catchError((error) => {
          throw "Error in creating course: " + error.message;
        })
      );
  }

  editCourse(id: string, course: Course): Observable<CourseDTO> {
    return this.http
      .put<{successful: boolean, result: any}>(environment.backend_uri + "/courses/" + id, course)
      .pipe(
        switchMap(response => {
          if (response.successful && response.result) {
            const course = response.result;
            return forkJoin(
              course.authors.map((authorId: string) => this.getAuthorById(authorId))
            ).pipe(
              map(authors => ({
                id: course.id,
                title: course.title,
                description: course.description,
                authors: authors,
                duration: course.duration,
                creationDate: course.creationDate
              }))
            );
          } 
          else {
            return of({}); // Return null or an empty object as per your error handling strategy
          }
        }),
        catchError(error => {
          console.error('Error in getting course:', error);
          return throwError(() => new Error("Error in getting course: " + error.message));
        })
      );
  }

  getCourse(id: string): Observable<CourseDTO> {
    return this.http.get<{successful: boolean, result: any}>(`${environment.backend_uri}/courses/${id}`).pipe(
      switchMap(response => {
        if (response.successful && response.result) {
          const course = response.result;
          return forkJoin(
            course.authors.map((authorId: string) => this.getAuthorById(authorId))
          ).pipe(
            map(authors => ({
              id: course.id,
              title: course.title,
              description: course.description,
              authors: authors,
              duration: course.duration,
              creationDate: course.creationDate
            }))
          );
        } 
        else {
          return of({}); // Return null or an empty object as per your error handling strategy
        }
      }),
      catchError(error => {
        console.error('Error in getting course:', error);
        return throwError(() => new Error("Error in getting course: " + error.message));
      })
    );
  }

  deleteCourse(id: string) {
    return this.http.delete(environment.backend_uri + "/courses/" + id).pipe(
      catchError((error) => {
        throw "Error in deleting course: " + error.message;
      })
    );
  }

  filterCourses(filters: {
    title?: string;
    description?: string;
    duration?: number;
    creationDate?: string;
  }): Observable<CourseDTO[]> {
    let params = new HttpParams();
    if (filters.title) {
      params = params.append("title", filters.title);
    }
    if (filters.description) {
      params = params.append("description", filters.description);
    }
    if (filters.duration) {
      params = params.append("duration", filters.duration.toString());
    }
    if (filters.creationDate) {
      params = params.append("creationDate", filters.creationDate);
    }

    return this.http
      .get<{successful: boolean, result: any[]}>(environment.backend_uri + "/courses/filter", { params })
      .pipe(
        switchMap(response => {
          if (response.successful && response.result.length > 0) {
            return forkJoin(
              response.result.map(course =>
                forkJoin(
                  course.authors.map((authorId: string) => this.getAuthorById(authorId))
                ).pipe(
                  map(authors => ({
                    ...course,
                    title: course.title,
                    description: course.description,
                    authors: authors,
                    duration: course.duration,
                  }))
                )
              )
            );
          } else {
            return of([]);
          }
        }),
        catchError(error => {
          console.error('Error in filtering courses:', error);
          return throwError(() => new Error("Error in filtering courses: " + error.message));
        })      
      );
  }

  getAllAuthors() {
    return this.http.get(environment.backend_uri + "/authors/all").pipe(
      map((response: any) => {
        return response.result;
      }),
      catchError((error) => {
        throw "Error in getting authors: " + error.message;
      })
    );
  }

  createAuthor(name: string): Observable<Author> {
    return this.http
      .post(environment.backend_uri + "/authors/add", { name: name })
      .pipe(
        map((response: any) => {
          return response.result;
        }),
        catchError((error) => {
          throw "Error in creating author: " + error.message;
        })
      );
  }

  getAuthorById(id: string): Observable<Author> {
    return this.http.get(environment.backend_uri + "/authors/" + id).pipe(
      map((response: any) => {
        return response.result;
      }),
      catchError((error) => {
        throw "Error in getting author: " + error.message;
      })
    );
  }
}
