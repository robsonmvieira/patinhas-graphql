import { ExceptionBase } from '.';
import { Exceptions } from '.';

export class NotFoundException extends ExceptionBase {
  readonly name = Exceptions.notFound;
}