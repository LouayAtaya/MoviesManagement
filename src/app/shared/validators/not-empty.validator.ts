import { AbstractControl, ValidationErrors } from "@angular/forms";

export function NotEmpty(control: AbstractControl): ValidationErrors {
    let value = control.value as string;
    
    if (value != null && value.trim().length==0) {
      return { 'NotEmpty': true }
    }
 
    return null;  
  }