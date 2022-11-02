import { Field, ObjectType } from '@nestjs/graphql'

import { ModelBase } from 'src/core/base-classes/graph.base'
import { Category, CategoryModel } from 'src/modules/category/entities'
import { SupplierModel } from 'src/modules/supplier/entities'

@ObjectType()
export class ProductModel extends ModelBase {
  @Field(() => String)
  title: string

  @Field(() => Boolean)
  isActive: boolean

  @Field(() => String)
  sku: string

  @Field(() => String)
  barCode: string

  @Field(() => Number)
  price: number

  @Field(() => Number)
  currentPrice: number

  @Field(() => Number)
  quantity: number

  @Field(() => String)
  brand: string

  // @Field(() => String)
  // unit?: string

  @Field(() => String)
  description?: string

  @Field(() => CategoryModel)
  category?: Category

  @Field(() => SupplierModel)
  supplier?: SupplierModel

  @Field(() => String)
  supplierId: string

  @Field(() => String)
  categoryId: string

  @Field(() => String)
  images?: string[]

  @Field(() => String)
  extraInfo?: string

  @Field(() => String)
  color?: string

  @Field(() => Boolean)
  betterPriceFromBeforeLastMonth: boolean

  @Field(() => Boolean)
  isPrime: boolean

  @Field(() => String)
  technicalInfo: string
}
