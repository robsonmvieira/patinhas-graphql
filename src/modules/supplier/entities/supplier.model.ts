import { Field, ObjectType } from '@nestjs/graphql'
import { ModelBase } from 'src/core/base-classes/graph.base'
import { Category, CategoryModel } from 'src/modules/category/entities'
import { Product, ProductModel } from 'src/modules/product/entities'

@ObjectType()
export class SupplierModel extends ModelBase {
  @Field(() => String)
  name: string

  @Field(() => String)
  description?: string

  @Field(() => String)
  logo?: string

  @Field(() => Boolean)
  isActive: boolean

  @Field(() => String)
  email: string

  @Field(() => String)
  phones: string[]

  @Field(() => Boolean)
  isBlocked: boolean

  @Field(() => String)
  cnpj: string

  @Field(() => String)
  address: string

  @Field(() => String, { nullable: true })
  extraInfo?: string

  @Field(() => [ProductModel], { nullable: true })
  products: Product[]

  @Field(() => CategoryModel, { nullable: true })
  category: Category

  @Field(() => String)
  categoryId: string
}
