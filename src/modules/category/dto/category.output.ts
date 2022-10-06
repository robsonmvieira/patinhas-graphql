import { Field, ObjectType } from '@nestjs/graphql'
import { BaseResponse } from 'src/shared/dtos/base.response'

import { CategoriesDTOResponse } from './categories.output'

@ObjectType()
export class CategoryResponse extends BaseResponse {
  @Field(() => CategoriesDTOResponse, { nullable: true })
  data?: CategoriesDTOResponse
}
