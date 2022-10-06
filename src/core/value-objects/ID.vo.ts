import { v4 as uuid, validate as uuidValidate } from 'uuid';
import { ValueObject } from '../base-classes/value-object';

export class UniqueID  extends ValueObject<string>{
  constructor(id?: string) {
    super(id ? id : uuid())
  }
  validate() {
    return uuidValidate(this.toString());
  }
}  