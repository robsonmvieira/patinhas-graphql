import { Module } from '@nestjs/common'
import { SupplierService } from './supplier.service'
import { SupplierResolver } from './supplier.resolver'
import { SharedModule } from 'src/shared/shared.module'

@Module({
  imports: [SharedModule],
  providers: [SupplierResolver, SupplierService]
})
export class SupplierModule {}
