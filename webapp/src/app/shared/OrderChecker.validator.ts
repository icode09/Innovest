import { AbstractControl } from "@angular/forms";
export function StartEndDateValidator(control: AbstractControl): {[key:string]: boolean} | null {
    const sDate = control.get('startDate');
    const eDate = control.get('endDate');
    
    return sDate && eDate && (sDate?.value > eDate?.value) ? {'orderError': true}: null; 
  }