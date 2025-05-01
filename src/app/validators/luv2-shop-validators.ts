import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {

    //whitespace validation
    static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
        // Check if string contains only whitespaces
        if (control.value !== null && control.value.trim().length === 0) {
            // Invalid: return error object
            return { 'notOnlyWhitespace': true };
        } else {
            // Valid: return null
            return null;
        }
    }

}
