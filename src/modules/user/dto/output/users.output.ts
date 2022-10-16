import { ObjectType, PickType, Field } from '@nestjs/graphql'
import { BaseResponse } from 'src/shared/dtos'
import { UserModel } from '../../entities'

@ObjectType()
export class UsersDTOResponse extends PickType(UserModel, [
  'id',
  'name',
  'email',
  'avatar',
  'role'
] as const) {}

@ObjectType()
export class UsersResponse extends BaseResponse {
  @Field(() => [UsersDTOResponse], { nullable: true })
  data?: UsersDTOResponse[]
}
