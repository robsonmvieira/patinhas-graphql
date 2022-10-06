import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { Category } from './entities'
import { UpdateCategoryArgs, CreateCategoryInput } from './dto'
import { BaseResponse } from 'src/shared/dtos'
import { CategoriesResponse, CategoryResponse } from './dto'
import { UniqueID } from 'src/core/value-objects/ID.vo'

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => BaseResponse, { name: 'addNewCategory' })
  async createCategory(
    @Args('payload') createCategoryInput: CreateCategoryInput
  ): Promise<BaseResponse> {
    const category = Category.create(createCategoryInput).getResult().toJSON()

    try {
      const { ok, error } = await this.categoryService.create(category)

      return {
        ok,
        error
      }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  @Query(() => CategoriesResponse, { name: 'listCategories' })
  async findAll(): Promise<CategoriesResponse> {
    try {
      const { ok, error, data } = await this.categoryService.findAll()
      return { ok, error, data }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  @Query(() => CategoryResponse, { name: 'getCategory' })
  async findOne(
    @Args('id', { type: () => String }) id: string
  ): Promise<CategoryResponse> {
    try {
      const { ok, error, data } = await this.categoryService.findOne(id)
      return { ok, error, data }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  @Mutation(() => BaseResponse, { name: 'updateCategory' })
  async updateCategory(
    @Args('input') updateCategoryInput: UpdateCategoryArgs
  ): Promise<BaseResponse> {
    try {
      const { data } = await this.categoryService.findOne(
        updateCategoryInput.id
      )
      const newPayload = Object.assign(data, updateCategoryInput.data)

      const category = Category.create(
        newPayload,
        new UniqueID(updateCategoryInput.id)
      )
        .getResult()
        .toJSON()

      const { ok, error } = await this.categoryService.update(
        updateCategoryInput.id,
        category
      )
      return { ok, error }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  @Mutation(() => BaseResponse)
  async removeCategory(
    @Args('id', { type: () => String }) id: string
  ): Promise<BaseResponse> {
    try {
      const { ok, error } = await this.categoryService.remove(id)
      return { ok, error }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }
}
