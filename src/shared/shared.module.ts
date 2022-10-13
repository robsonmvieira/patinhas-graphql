import { Module } from '@nestjs/common'
import { FileUploadController } from './controllers/file-upload/file-upload.controller'
import { PrismaService } from './services/prisma.service'

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  controllers: [FileUploadController]
})
export class SharedModule {}
