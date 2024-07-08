import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Author, Course, CourseDTO } from "./model/course.model";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(environment.backend_uri + "/courses/all").pipe(
      map((response: any) => {
        return response.result;
      }),
      catchError((error) => {
        throw "Error in getting courses: " + error.message;
      })
    );
  }

  createCourse(course: Course) {
    return this.http
      .post(environment.backend_uri + "/courses/add", course)
      .pipe(
        catchError((error) => {
          throw "Error in creating course: " + error.message;
        })
      );
  }

  editCourse(id: string, course: Course) {
    return this.http
      .put(environment.backend_uri + "/courses/" + id, course)
      .pipe(
        catchError((error) => {
          throw "Error in editting course: " + error.message;
        })
      );
  }

  getCourse(id: string) {
    return this.http.get(environment.backend_uri + "/courses/" + id).pipe(
      map((response: any) => {
        return response.result;
      }),
      catchError((error) => {
        throw "Error in getting course: " + error.message;
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
  }): Observable<Course[]> {
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
      .get(environment.backend_uri + "/courses/filter", { params })
      .pipe(
        map((response: any) => {
          if (response.successful) {
            return response.result;
          }
        }),
        catchError((error) => {
          throw "Error in filtering: " + error.message;
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
