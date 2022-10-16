import { InputType, Field, OmitType, PickType } from '@nestjs/graphql'
import { UserModel } from '../../entities'

@InputType()
export class CreateUserDto extends PickType(
  UserModel,
  ['avatar', 'email', 'name', 'password', 'role'],
  InputType
) {
  @Field(() => String)
  confirmPassword: string
}
