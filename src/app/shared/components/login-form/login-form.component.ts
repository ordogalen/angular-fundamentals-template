import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { map } from "rxjs";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  email!: string;
  password!: string;

  isLoading = false;
  showModal = false;
  modalTitle = "Login Error";
  modalMessage = "";

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          console.log("Logged in successfully!");
          this.isLoading = false;
          this.router.navigate(["/courses"]);
        },
        error: (errorMessage) => {
          console.error("Login failed:", errorMessage);
          this.modalMessage = errorMessage;
          this.showModal = true;
          this.isLoading = false;
        },
      });
    } else {
      this.modalMessage = "Form is not valid";
      this.loginForm.control.markAllAsTouched();
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
