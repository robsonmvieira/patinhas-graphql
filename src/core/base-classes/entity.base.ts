import { UniqueID } from "../value-objects/ID.vo";
import { BaseDomainEntity } from "./base-entity";


const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity
}

export abstract class Entity<T extends BaseDomainEntity> {
  protected readonly _id: UniqueID
  protected readonly _props: T

  constructor(protected props: T, id?: UniqueID) {
    this._id = id || new UniqueID()
    this._props = props
  }

  get createdAt(): Date {
    return this._props.createdAt ?? new Date()
  }

  get updatedAt(): Date {
    return this._props.updatedAt ?? new Date()
  }

  get isDeleted(): boolean {
    return this._props.isDeleted ?? false
  }

  get isBlocked(): boolean {
    return this._props.isBlocked ?? false
  }

  // get props(): T {
  //   return this._props
  // }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false
    }

    if (this === object) {
      return true
    }

    if (!isEntity(object)) {
      return false
    }
    return this._id.equals(object._id)
  }

  get id(): string {
    return this._id.value
  }

  toJSON(): Required<{id: string} & T> {
    return {
      id: this.id,
      ...this._props
    } as Required<{id: string} & T>
  }
  get value() {
    return {
      ...this._props,
    }
  }
}