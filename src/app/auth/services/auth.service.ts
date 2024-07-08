import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { UserStoreService } from "@app/user/services/user-store.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private userStorageService: UserStoreService
  ) {}

  login(user: any): Observable<any> {
    return this.http.post(environment.backend_uri + "/login", user).pipe(
      tap((response: any) => {
        this.sessionStorageService.setToken(response.result);
        this.isAuthorized$$.next(true);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    this.sessionStorageService.deleteToken();
    this.isAuthorised = false;
  }

  register(user: User): Observable<any> {
    return this.http
      .post(environment.backend_uri + "/register", user)
      .pipe(catchError(this.handleError));
  }

  get isAuthorised() {
    return this.isAuthorized$$.value;
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl() {
    return "/login";
  }

  hasToken(): boolean {
    return !!this.sessionStorageService.getToken();
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage =
      error.error?.message || error.message || "An unknown error occurred!";
    return throwError(errorMessage);
  }
}
