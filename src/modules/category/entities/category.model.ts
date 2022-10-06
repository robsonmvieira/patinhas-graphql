import { ObjectType, Field } from '@nestjs/graphql'
import { ModelBase } from 'src/core/base-classes/graph.base'

@ObjectType()
export class CategoryModel extends ModelBase {
  @Field(() => String)
  name: string

  @Field(() => String)
  description?: string

  @Field(() => Boolean)
  isActive: boolean
}
