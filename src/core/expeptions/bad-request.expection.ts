import { ExceptionBase } from '.';
import { Exceptions } from '.';

export class BadRequestException extends ExceptionBase {
  readonly name = Exceptions.badRequest;
}