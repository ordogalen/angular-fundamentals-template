import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>("");
  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  private isDataLoaded$$ = new BehaviorSubject<boolean>(false);

  name$ = this.name$$.asObservable();
  isAdmin$ = this.isAdmin$$.asObservable();
  isDataLoaded$ = this.isDataLoaded$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    this.userService
      .getUser()
      .pipe(
        tap((response: any) => {
          this.name$$.next(response.result.name);
          this.isAdmin$$.next(response.result.role === "admin");
          this.isDataLoaded$$.next(true);
        })
      )
      .subscribe();
  }

  get isAdmin() {
    return this.isAdmin$$.value;
  }

  logout() {
    this.name$$.next("");
    this.isAdmin$$.next(false);
    this.isDataLoaded$$.next(false);
  }
}
