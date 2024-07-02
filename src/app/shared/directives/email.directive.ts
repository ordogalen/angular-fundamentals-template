import { Directive } from "@angular/core";
import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true,
       }]
})
export class EmailValidatorDirective implements Validator {

    validate(control: FormControl): ValidationErrors | null {
        return emailValidator()(control);
    }
}

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(control.value == null){
        return null;
      }  
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      const valid = emailRegex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }