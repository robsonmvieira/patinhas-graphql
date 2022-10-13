import { ObjectType, OmitType, Field } from '@nestjs/graphql'
import { BaseResponse } from 'src/shared/dtos'
import { ProductModel } from '../../entities'

@ObjectType()
export class ProductsDTOResponse extends OmitType(ProductModel, [] as const) {}

@ObjectType()
export class ProductsResponse extends BaseResponse {
  @Field(() => [ProductsDTOResponse], { nullable: true })
  data?: ProductsDTOResponse[]
}
