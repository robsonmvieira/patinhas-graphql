import { ObjectType, Field } from '@nestjs/graphql'
import { BaseResponse } from 'src/shared/dtos'
import { SuppliersDTOResponse } from '.'

@ObjectType()
export class SupplierResponse extends BaseResponse {
  @Field(() => SuppliersDTOResponse, { nullable: true })
  data?: SuppliersDTOResponse
}
