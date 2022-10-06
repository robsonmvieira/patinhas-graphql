import { ExceptionBase } from '.';
import { Exceptions } from '.';

export class ValidationException extends ExceptionBase {
  readonly name = Exceptions.validation;
}