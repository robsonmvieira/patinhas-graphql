import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ProductService } from './product.service'
import { ProductModel, Product } from './entities'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'
import { BaseResponse } from 'src/shared/dtos'
import { CreateSupplierDto, ProductResponse, ProductsResponse } from './dto'

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => BaseResponse)
  async createProduct(
    @Args('input') input: CreateProductInput
  ): Promise<BaseResponse> {
    try {
      const product: CreateSupplierDto = Product.create(input)
        .getResult()
        .toJSON()
      console.log(product)
      const { ok, error } = await this.productService.create(product)
      return { ok, error }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  @Query(() => ProductsResponse, { name: 'listProducts' })
  async findAll(): Promise<ProductsResponse> {
    try {
      const { ok, error, data } = await this.productService.findAll()
      return { ok, error, data }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  @Query(() => ProductResponse, { name: 'getProduct' })
  async findOne(
    @Args('id', { type: () => String }) id: string
  ): Promise<ProductResponse> {
    try {
      const { ok, error, data } = await this.productService.findOne(id)
      return { ok, error, data }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  @Mutation(() => BaseResponse, { name: 'updateProduct' })
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput
  ) {
    return this.productService.update(updateProductInput.id, updateProductInput)
  }

  @Mutation(() => BaseResponse, { name: 'deleteProduct' })
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id)
  }
}
