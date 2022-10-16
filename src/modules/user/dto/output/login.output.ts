import { Field, ObjectType } from '@nestjs/graphql'
import { BaseResponse } from 'src/shared/dtos'

@ObjectType()
export class LoginOutput extends BaseResponse {
  @Field(() => String, { nullable: true })
  token?: string
}
