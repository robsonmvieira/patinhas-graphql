import { InputType, OmitType } from '@nestjs/graphql'
import { ProductModel } from '../entities'

@InputType()
export class CreateProductInput extends OmitType(
  ProductModel,
  ['id', 'createdAt', 'updatedAt', 'category', 'supplier'],
  InputType
) {}
