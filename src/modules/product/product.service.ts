import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { CreateSupplierDto } from './dto'
import { CreateProductInput } from './dto/create-product.input'
import { UpdateProductInput } from './dto/update-product.input'

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async create(payload: CreateSupplierDto): Promise<{
    ok: boolean
    error: string
  }> {
    try {
      const product = await this.prismaService.product.create({
        data: {
          id: payload.id,
          title: payload.title,
          isActive: payload.isActive,
          description: payload.description,
          extraInfo: payload.extraInfo,
          barCode: payload.barCode,
          sku: payload.sku,
          price: payload.price,
          currentPrice: payload.currentPrice,
          quantity: payload.quantity,
          brand: payload.brand,
          color: payload.color,
          isPrime: payload.isPrime,
          images: payload.images,
          betterPriceFromBeforeLastMonth:
            payload.betterPriceFromBeforeLastMonth,
          technicalInfo: payload.technicalInfo,

          category: {
            connect: {
              id: payload.categoryId
            }
          },
          supplier: {
            connect: { id: payload.supplierId }
          }
        }
      })

      if (!product) {
        return {
          ok: false,
          error: 'Product not created'
        }
      }

      return {
        ok: true,
        error: null
      }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  async findAll(): Promise<{ ok: boolean; error: string; data?: any }> {
    try {
      const data = await this.prismaService.product.findMany({
        include: {
          category: true,
          supplier: true
        }
      })
      return { ok: true, error: null, data }
    } catch (error) {
      return {
        ok: false,
        error: error.message
      }
    }
  }

  async findOne(
    id: string
  ): Promise<{ ok: boolean; error: string; data?: any }> {
    try {
      const supplier = await this.prismaService.product.findUnique({
        where: { id },
        include: {
          supplier: true,
          category: true
        }
      })

      if (!supplier) {
        return {
          ok: false,
          error: 'Product not found'
        }
      }

      return {
        ok: true,
        error: null,
        data: supplier
      }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
