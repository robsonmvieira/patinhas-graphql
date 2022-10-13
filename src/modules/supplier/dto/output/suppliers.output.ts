import { ObjectType, PickType, Field } from '@nestjs/graphql'
import { BaseResponse } from 'src/shared/dtos'
import { SupplierModel } from '../../entities'

@ObjectType()
export class SuppliersDTOResponse extends PickType(SupplierModel, [
  'id',
  'name',
  'description',
  'isActive',
  'address',
  'phones',
  'email',
  'logo',
  'extraInfo',
  'isBlocked',
  'category',
  'products',
  'cnpj'
] as const) {}

@ObjectType()
export class SuppliersResponse extends BaseResponse {
  @Field(() => [SuppliersDTOResponse], { nullable: true })
  data?: SuppliersDTOResponse[]
}
