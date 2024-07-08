import { Component } from "@angular/core";
import {
  EmailValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { emailValidator } from "@app/shared/directives/email.directive";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  isLoading = false;
  showModal = false;
  modalTitle = "Registration Error";
  modalMessage = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = fb.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, emailValidator()]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }
  onFormSubmit() {
    if (this.registrationForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registrationForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(["/login"]);
        },
        error: (errorMessage) => {
          console.error("Registration failed:", errorMessage);
          this.modalMessage = errorMessage;
          this.showModal = true;
          this.isLoading = false;
        },
      });
    } else {
      this.modalMessage = "Form is not valid";
      this.showModal = true;
      this.registrationForm.markAllAsTouched();
    }
  }
  closeModal() {
    this.showModal = false;
  }
}
