import { ObjectType, Field } from '@nestjs/graphql'
import { ModelBase } from 'src/core/base-classes/graph.base'

@ObjectType()
export class UserModel extends ModelBase {
  @Field(() => String)
  name: string

  @Field(() => String)
  password: string

  @Field(() => String)
  email: string
}
