import { InputType, PickType } from '@nestjs/graphql'
import { SupplierModel } from '../../entities'

@InputType()
export class CreateSupplierDto extends PickType(
  SupplierModel,
  [
    'id',
    'name',
    'email',
    'phones',
    'address',
    'isActive',
    'description',
    'extraInfo',
    'isBlocked',
    'cnpj',
    'categoryId',
    'category'
  ],
  InputType
) {}
