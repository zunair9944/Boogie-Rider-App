import { FormGroup } from "@angular/forms";

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl:any = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

export function convertHMS(value:any) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours:any   = Math.floor(sec / 3600); // get hours
    let minutes:any = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds:any = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    // alert(hours+':'+minutes+':'+seconds)
    return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
}