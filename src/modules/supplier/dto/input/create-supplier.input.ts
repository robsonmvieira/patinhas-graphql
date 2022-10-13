import { InputType, PickType } from '@nestjs/graphql'
import { SupplierModel } from '../../entities'

@InputType()
export class CreateSupplierInput extends PickType(
  SupplierModel,
  [
    'name',
    'email',
    'phones',
    'address',
    'isActive',
    'description',
    'extraInfo',
    'isBlocked',
    'cnpj',
    'categoryId'
  ],
  InputType
) {}
