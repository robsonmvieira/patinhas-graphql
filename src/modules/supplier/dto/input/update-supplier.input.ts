import { CreateSupplierInput } from './create-supplier.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateSupplierInput extends PartialType(CreateSupplierInput) {}

@InputType()
export class UpdateSupplierArgs {
  @Field(() => String)
  id: string

  @Field(() => UpdateSupplierInput)
  data: UpdateSupplierInput
}
