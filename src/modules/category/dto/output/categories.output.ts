import { Field, ObjectType, PickType } from '@nestjs/graphql'
import { BaseResponse } from 'src/shared/dtos/base.response'
import { CategoryModel } from '../../entities'

@ObjectType()
export class CategoriesDTOResponse extends PickType(CategoryModel, [
  'id',
  'name',
  'description',
  'isActive',
  'products',
  'suppliers'
] as const) {}

@ObjectType()
export class CategoriesResponse extends BaseResponse {
  @Field(() => [CategoriesDTOResponse], { nullable: true })
  data?: CategoriesDTOResponse[]
}
