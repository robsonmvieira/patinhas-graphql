import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { CreateUserInput } from './dto'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateUserInput): Promise<{ ok: boolean; error: string }> {
    try {
      const user = await this.prismaService.user.create({ data: { ...data } })

      if (!user) {
        return {
          ok: false,
          error: 'User not created'
        }
      }
      return { ok: true, error: null }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  async findAll(): Promise<{ ok: boolean; error: string; data?: any }> {
    try {
      const users = await this.prismaService.user.findMany()
      if (!users) {
        return {
          ok: false,
          error: 'Users not found',
          data: null
        }
      }
      return { ok: true, error: null, data: users }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  async findOne(
    id: string
  ): Promise<{ ok: boolean; error: string; data?: any }> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id }
      })

      if (!user) {
        return {
          ok: false,
          error: 'User not found'
        }
      }

      return {
        ok: true,
        error: null,
        data: user
      }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  async findByEmail(
    email: string
  ): Promise<{ ok: boolean; error: string; data?: any }> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email }
      })

      if (!user) {
        return {
          ok: false,
          error: 'User not found'
        }
      }

      return {
        ok: true,
        error: null,
        data: user
      }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }
  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  async remove(
    id: string
  ): Promise<{ ok: boolean; error: string; code?: number }> {
    try {
      const user = await this.prismaService.user.delete({
        where: { id }
      })

      if (!user) {
        return {
          ok: false,
          error: 'User not deleted',
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
        message: 'id user does not exists',
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
