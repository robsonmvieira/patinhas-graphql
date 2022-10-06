import { ValidationException } from "../expeptions/validation.expection"

export class ValidatorRules {

  private constructor(private value: any, private property: string) {}

  static values(value: any, property: string) {
    return new ValidatorRules(value, property)
  }
  required(): Omit<this, 'required'> {
    if (this.value === null || this.value === undefined || this.value === '') {
      throw new ValidationException(`The ${this.property} is required`)
    }
    return this
  }

  string(): Omit<this, 'string'> {
    if (typeof this.value !== 'string') {
      throw new ValidationException(`The ${this.property} must be a string`)
      
    }
    return this
  }
  number(): Omit<this, 'number'> {
    if (typeof this.value !== 'number') {
      throw new ValidationException(`The value must be a number`)
    }
    return this
  }

  boolean(): Omit<this, 'boolean'> {
    if (typeof this.value !== 'boolean') {
      throw new ValidationException(`The ${this.value} must be a boolean`)
    }
    return this
  }

  maxLength(max: number): Omit<this, 'maxLength'> {
    if (!isEmpty(max) && this.value.length > max) {
      throw new ValidationException(`The ${this.property} length must be less than ${max} characters`)
    }
    return this
  }
  minLength(min: number): Omit<this, 'minLength'> {
    if (!isEmpty(min) && this.value.length < min) {
      throw new ValidationException(`The ${this.property} length must be greater than ${min} characters`)
      
    }
    return this
  }
}

export function isEmpty(value: any): boolean {
  return value === null || value === undefined || value === ''
}