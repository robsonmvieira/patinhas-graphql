import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { SharedModule } from 'src/shared/shared.module'

@Module({
  imports: [SharedModule],
  providers: [UserResolver, UserService]
})
export class UserModule {}
