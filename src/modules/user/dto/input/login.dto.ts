import { PickType, InputType } from '@nestjs/graphql'
import { UserModel } from '../../entities'

@InputType()
export class LoginDto extends PickType(
  UserModel,
  ['email', 'password'],
  InputType
) {}
