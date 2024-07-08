import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from './user/services/user-store.service';
import { Subject, takeUntil } from 'rxjs';
import { CoursesStoreService } from './services/courses-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  title = 'courses-app';
  isLoggedIn = false;
  name$ = this.userStoreService.name$;
  isAdmin$ = this.userStoreService.isAdmin$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit() {
    this.authService.isAuthorized$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(isAuth => {
        this.isLoggedIn = isAuth;
        this.userStoreService.getUser();
      });
  }

  logout() {
    this.authService.logout();
    this.userStoreService.logout();
    this.router.navigate([""]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}