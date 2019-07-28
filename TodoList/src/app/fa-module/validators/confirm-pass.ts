import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export function _passConfirm(controlSrc: AbstractControl): ValidatorFn {
    return function(control: AbstractControl): ValidationErrors | null {
        return control.value === controlSrc.value ? null : {_passConfirm: {message: 'Passwords do not match'}}
    }
}