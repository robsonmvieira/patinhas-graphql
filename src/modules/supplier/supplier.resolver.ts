import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SupplierService } from './supplier.service'
import { Supplier } from './entities/supplier.entity'

import {
  CreateSupplierInput,
  SupplierResponse,
  SuppliersResponse,
  UpdateSupplierArgs
} from './dto'
import { BaseResponse } from 'src/shared/dtos'

import { UniqueID } from 'src/core/value-objects'

@Resolver(() => Supplier)
export class SupplierResolver {
  constructor(private supplierService: SupplierService) {}

  @Mutation(() => BaseResponse, { name: 'newSupplier' })
  async createSupplier(
    @Args('data') createSupplierInput: CreateSupplierInput
  ): Promise<BaseResponse> {
    try {
      const supplier = Supplier.create(createSupplierInput).getResult().toJSON()
      const { ok, error } = await this.supplierService.create(supplier)
      return { ok, error }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  @Query(() => SuppliersResponse, { name: 'suppliers' })
  async findAll(): Promise<SuppliersResponse> {
    try {
      const { ok, error, data } = await this.supplierService.findAll()
      return { ok, error, data }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  @Query(() => SupplierResponse, { name: 'getSupplier' })
  async findOne(
    @Args('id', { type: () => String }) id: string
  ): Promise<SupplierResponse> {
    try {
      const { ok, error, data } = await this.supplierService.findOne(id)
      return { ok, error, data }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  @Mutation(() => BaseResponse)
  async updateSupplier(
    @Args('data') updateSupplierInput: UpdateSupplierArgs
  ): Promise<BaseResponse> {
    try {
      const { id } = updateSupplierInput
      const { data } = await this.supplierService.findOne(id)
      const newPayload = Object.assign(data, updateSupplierInput.data)
      const supplier = Supplier.create(newPayload, new UniqueID(id))
        .getResult()
        .toJSON()
      // console.log('supplier => ', supplier)
      const { ok, error } = await this.supplierService.update(
        updateSupplierInput.id,
        supplier
      )
      return { ok, error }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  @Mutation(() => BaseResponse)
  async removeSupplier(
    @Args('id', { type: () => String }) id: string
  ): Promise<BaseResponse> {
    try {
      const { ok, error } = await this.supplierService.remove(id)
      return { ok, error }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }
}
