import { CreateCategoryInput } from './create-category.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {}

@InputType()
export class UpdateCategoryArgs {
  @Field(() => String)
  id: string

  @Field(() => UpdateCategoryInput)
  data: UpdateCategoryInput
}
