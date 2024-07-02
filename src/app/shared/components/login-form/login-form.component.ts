import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  email!: string;
  password!: string;
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.loginForm.reset();
      // TODO: Implement authentication logic here
    } else {
      alert('Form is not valid');
      this.loginForm.control.markAllAsTouched(); 
    }
  }
}
