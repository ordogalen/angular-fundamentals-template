import { Inject, Injectable } from "@angular/core";
import { WINDOW } from "@app/app.module";

const TOKEN = "SESSION_TOKEN"; // Use this constant for the session storage entry key

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string) {
    sessionStorage.setItem(
      TOKEN,
      token.startsWith("Bearer ") ? token.split(" ")[1] : token
    );
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    1;
    sessionStorage.removeItem(TOKEN);
  }
}
