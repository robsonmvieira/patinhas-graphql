import { Entity } from "./entity.base";


export abstract class AggregateRoot<T = any> extends Entity<T> {
  // private _domainEvents: IDomainEvent[] = [];

  // constructor(props: T, id?: UniqueID) {
  //   super(props, id)
  // }

  get id(): string {
    return this._id.value
  }
}