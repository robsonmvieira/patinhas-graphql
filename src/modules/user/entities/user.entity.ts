import { AggregateRoot } from 'src/core/base-classes/aggregate-root.entity'
import { Result } from 'src/core/base-classes/result'
import { UniqueID } from 'src/core/value-objects'

import { UserProps } from '.'

export class User extends AggregateRoot<UserProps> {
  private constructor(readonly props: UserProps, id?: UniqueID) {
    super(props, id)
  }

  public static create(data: UserProps, id?: UniqueID): Result<User> {
    const payload: UserProps = {
      name: data.name,
      email: data.email,
      password: data.password
    }
    User.validate(payload)
    return Result.ok(new User(payload, id))
  }

  public static validate(data: UserProps) {}
}
