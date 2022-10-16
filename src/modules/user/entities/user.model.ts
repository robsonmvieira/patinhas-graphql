import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { ModelBase } from 'src/core/base-classes/graph.base'

export enum RoleUser {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  SUPPLIER = 'SUPPLIER',
  CUSTOMER = 'CUSTOMER',
  MANAGER = 'MANAGER',
  ASSISTANT = 'ASSISTANT'
}

registerEnumType(RoleUser, {
  name: 'role'
})

@ObjectType()
export class UserModel extends ModelBase {
  @Field(() => String)
  name: string

  @Field(() => String)
  password: string

  @Field(() => String)
  email: string

  @Field(() => String, { nullable: true })
  avatar?: string

  @Field(() => RoleUser)
  role: RoleUser
}
