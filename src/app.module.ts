import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ProductModule } from './modules/product/product.module'
import { SupplierModule } from './modules/supplier/supplier.module'

import { CategoryModule } from './modules/category/category.module'

import { ConfigModule } from '@nestjs/config'
import { UserModule } from './modules/user/user.module'
import { AuthMiddleware } from './shared/services/auth.service'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.dev'],
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ user: req['user'] })
    }),
    ProductModule,
    SupplierModule,
    CategoryModule,
    UserModule,
    SharedModule
  ],

  providers: []
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
