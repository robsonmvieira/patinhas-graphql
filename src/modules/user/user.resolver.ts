import { Resolver, Mutation, Args, Query } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './entities/user.entity'

import { BaseResponse } from 'src/shared/dtos'
import {
  CreateUserDto,
  LoginDto,
  LoginOutput,
  UserResponse,
  UsersResponse
} from './dto'

import * as bcript from 'bcryptjs'
import { sign } from 'jsonwebtoken'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => BaseResponse)
  async createUser(@Args('input') dto: CreateUserDto): Promise<BaseResponse> {
    try {
      const user = User.create(dto).getResult().toJSON()
      user.password = await bcript.hash(user.password, 10)
      const { ok, error } = await this.userService.create(user)
      return { ok, error }
    } catch (error) {}
  }

  @Query(() => UsersResponse, { name: 'users' })
  async findAll(): Promise<UsersResponse> {
    try {
      const { ok, error, data } = await this.userService.findAll()
      return { ok, error, data }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.userService.findOne(id)
  // }

  @Query(() => UserResponse, { name: 'getUser' })
  async findOne(
    @Args('id', { type: () => String }) id: string
  ): Promise<UserResponse> {
    try {
      const { ok, error, data } = await this.userService.findOne(id)
      return { ok, error, data }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.userService.update(updateUserInput.id, updateUserInput)
  // }

  @Mutation(() => BaseResponse)
  async removeUser(
    @Args('id', { type: () => String }) id: string
  ): Promise<BaseResponse> {
    try {
      const { ok, error } = await this.userService.remove(id)
      return { ok, error }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  @Mutation(() => LoginOutput, { name: 'login' })
  async Login(@Args('input') input: LoginDto): Promise<LoginOutput> {
    try {
      const { ok, data, error } = await this.userService.findByEmail(
        input.email
      )
      if (!data) {
        return {
          ok: false,
          error: 'User not found'
        }
      }
      const passwordDoesNotMatched = await bcript.compare(
        input.password,
        data.password
      )
      if (!passwordDoesNotMatched) {
        return {
          ok: false,
          error: 'Password or email incorrect'
        }
      }
      const token = sign({ id: data.id }, process.env.SECRET_KEY, {
        expiresIn: '8h'
      })
      return { ok, error, token }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }
}
