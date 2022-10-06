import { InputType, PickType } from '@nestjs/graphql'
import { CategoryModel } from '../entities/category.model'

@InputType()
export class CreateCategoryInput extends PickType(
  CategoryModel,
  ['isActive', 'name', 'description'],
  InputType
) {}
