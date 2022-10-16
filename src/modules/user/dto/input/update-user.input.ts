import { InputType, Field, PartialType } from '@nestjs/graphql'
import { CreateUserDto } from '.'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserDto) {
  @Field(() => String)
  id: string
}
