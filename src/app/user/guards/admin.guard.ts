import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, filter, take } from "rxjs/operators";
import { UserStoreService } from "../services/user-store.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private userStore: UserStoreService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userStore.isDataLoaded$.pipe(
      filter((isLoaded) => isLoaded),
      take(1),
      map(() => {
        if (!this.userStore.isAdmin) {
          return this.router.createUrlTree(["courses"]);
        }
        return true;
      })
    );
  }
}
