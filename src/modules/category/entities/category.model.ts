import { ObjectType, Field } from '@nestjs/graphql'
import { ModelBase } from 'src/core/base-classes/graph.base'
import { ProductModel } from 'src/modules/product/entities'
import { SupplierModel } from 'src/modules/supplier/entities'

@ObjectType()
export class CategoryModel extends ModelBase {
  @Field(() => String)
  name: string

  @Field(() => String)
  description?: string

  @Field(() => Boolean)
  isActive: boolean

  @Field(() => [ProductModel])
  products: ProductModel[]

  @Field(() => [SupplierModel])
  suppliers: SupplierModel[]
}
