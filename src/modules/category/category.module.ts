import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryResolver } from './category.resolver'
import { SharedModule } from 'src/shared/shared.module'

@Module({
  providers: [CategoryResolver, CategoryService],
  imports: [SharedModule]
})
export class CategoryModule {}
