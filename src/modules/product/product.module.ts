import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductResolver } from './product.resolver'
import { GraphQLModule } from '@nestjs/graphql'
@Module({
  providers: [ProductResolver, ProductService]
})
export class ProductModule {}
