import { validateSync } from 'class-validator';
import { FieldsErrors, IValidatorFields } from "./validatior-fields.contract";

export abstract class ClassValidator<T> implements IValidatorFields<T> {
  errors: FieldsErrors = null;
  validatedData: any = null;
  validate(data: any): boolean {
    const errors = validateSync(data);

    if (errors.length > 0) {
      this.errors = {}
      for(const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
     } else {
        this.validatedData = data;
      }
    return !errors.length;
    
  }
}
