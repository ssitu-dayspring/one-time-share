import { FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';

abstract class BaseAbstractFormService
{
    private form: FormGroup;

    validate(formGroup: (FormGroup | FormArray)) {
        Object.keys(formGroup.controls).forEach((field) => {
            let control: AbstractControl = formGroup.get(field);

            if (control instanceof FormControl) {
                control.markAsDirty({onlySelf: true});
            } else if (control instanceof FormGroup || control instanceof FormArray) {
                this.validate(<FormGroup> control);
            }
        });
    }

    hasError(name: string, error?: string) : boolean {
        if (!this.form) return false;

        let tree = name.split('.');
        let o: any = this.form;

        tree.forEach(key => {
            o = o.get(key);
        });

        return (error)
            ? o.hasError(error) && !o.pristine
            : o.errors && !o.pristine;
    }
}
