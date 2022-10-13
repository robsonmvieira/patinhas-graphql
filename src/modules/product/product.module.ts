import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'
import { SharedModule } from 'src/shared/shared.module'
@Module({
  imports: [SharedModule],
  providers: [ProductResolver, ProductService]
})
export class ProductModule {}
