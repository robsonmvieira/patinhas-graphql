import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ModelBase {
  @Field(() => String)
  id: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
