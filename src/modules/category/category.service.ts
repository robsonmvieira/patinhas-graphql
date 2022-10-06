import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { CreateCategoryPayload } from './dto/create-category.payload'
import { UpdateCategoryArgs } from './dto'
import { Category } from './entities'

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(payload: CreateCategoryPayload): Promise<{
    ok: boolean
    error: string
  }> {
    try {
      const category = await this.prismaService.category.create({
        data: {
          id: payload.id,
          name: payload.name,
          isActive: payload.isActive,
          description: payload.description
        }
      })

      if (!category) {
        return {
          ok: false,
          error: 'Category not created'
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

  async findAll(): Promise<any> {
    try {
      const data = await this.prismaService.category.findMany()
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
      const category = await this.prismaService.category.findUnique({
        where: { id }
      })

      if (!category) {
        return {
          ok: false,
          error: 'Category not found'
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

  async update(
    id: string,
    updateCategoryInput: CreateCategoryPayload
  ): Promise<{ ok: boolean; error: string; data?: any }> {
    try {
      const category = await this.prismaService.category.update({
        where: { id },
        data: {
          id: updateCategoryInput.id,
          name: updateCategoryInput.name,
          isActive: updateCategoryInput.isActive,
          description: updateCategoryInput.description
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
      const category = await this.prismaService.category.delete({
        where: { id }
      })

      if (!category) {
        return {
          ok: false,
          error: 'Category not deleted',
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
