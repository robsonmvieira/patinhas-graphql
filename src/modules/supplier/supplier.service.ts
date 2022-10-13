import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { CreateSupplierDto } from './dto'

// import { UpdateSupplierInput } from './dto/update-supplier.input'

@Injectable()
export class SupplierService {
  constructor(private prismaService: PrismaService) {}

  async create(payload: CreateSupplierDto): Promise<{
    ok: boolean
    error: string
  }> {
    try {
      const category = await this.prismaService.supplier.create({
        data: {
          id: payload.id,
          name: payload.name,
          isActive: payload.isActive,
          description: payload.description,
          email: payload.email,
          address: payload.address,
          cnpj: payload.cnpj,
          phone: payload.phones,
          extraInfo: payload.extraInfo,
          isBlocked: payload.isBlocked,
          category: {
            connect: {
              id: payload.categoryId
            }
          },
          products: {
            create: []
          }
        }
      })

      if (!category) {
        return {
          ok: false,
          error: 'Supplier not created'
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
      const data = await this.prismaService.supplier.findMany({
        include: {
          category: true,
          products: true
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
      const supplier = await this.prismaService.supplier.findUnique({
        where: { id },
        include: {
          products: true,
          category: true
        }
      })

      if (!supplier) {
        return {
          ok: false,
          error: 'Supplier not found'
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

  async update(
    id: string,
    payload: CreateSupplierDto
  ): Promise<{ ok: boolean; error: string; data?: any }> {
    try {
      const category = await this.prismaService.supplier.update({
        where: { id },
        data: {
          id: payload.id,
          name: payload.name,
          isActive: payload.isActive,
          description: payload.description,
          email: payload.email,
          address: payload.address,
          cnpj: payload.cnpj,
          phone: payload.phones,
          extraInfo: payload.extraInfo,
          isBlocked: payload.isBlocked,
          category: {
            connect: {
              id: payload.categoryId
            }
          },
          products: {
            create: []
          }
        }
      })

      if (!category) {
        return {
          ok: false,
          error: 'Category not updated'
        }
      }

      return {
        ok: true,
        error: null,
        data: category
      }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  async remove(
    id: string
  ): Promise<{ ok: boolean; error: string; code?: number }> {
    try {
      const category = await this.prismaService.supplier.delete({
        where: { id }
      })

      if (!category) {
        return {
          ok: false,
          error: 'Supplier not deleted',
          code: 404
        }
      }

      return {
        ok: true,
        error: null,
        code: 201
      }
    } catch (error) {
      const { message, code } = this.checkDeleteError(error.message)
      return { ok: false, error: message, code }
    }
  }

  private checkDeleteError(errorMessage: string): {
    message: string
    code: number
  } {
    const options = {
      'Record to delete does not exist.': {
        message: 'id provided does not exists',
        code: 404
      },
      default: {
        message: 'Something went wrong',
        code: 500
      }
    }

    const optionFound = Object.keys(options).find(el =>
      errorMessage.includes(el)
    )

    return optionFound ? options[optionFound] : options.default
  }
}
