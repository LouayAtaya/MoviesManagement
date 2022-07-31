import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function PasswordConfirmation(passwordControl: AbstractControl): ValidatorFn {
    return (confirmationControl: AbstractControl) : { [key: string]: boolean } | null => {
      const confirmValue = confirmationControl.value;
      const passwordValue = passwordControl.value;
      if (confirmValue === '') {
          return;
      }
      if (confirmValue !== passwordValue) {
          return  { mustMatch: true }
      } 
      return null;
    };
}
