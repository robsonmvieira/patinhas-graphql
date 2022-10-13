import { ObjectType, Field } from '@nestjs/graphql'
import { BaseResponse } from 'src/shared/dtos'
import { ProductsDTOResponse } from '.'

@ObjectType()
export class ProductResponse extends BaseResponse {
  @Field(() => ProductsDTOResponse, { nullable: true })
  data?: ProductsDTOResponse
}
