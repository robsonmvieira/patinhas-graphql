import { ObjectType, Field } from '@nestjs/graphql'
import { BaseResponse } from 'src/shared/dtos'
import { UsersDTOResponse } from '.'

@ObjectType()
export class UserResponse extends BaseResponse {
  @Field(() => UsersDTOResponse, { nullable: true })
  data?: UsersDTOResponse
}
