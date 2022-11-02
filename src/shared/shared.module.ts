// import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { Module } from '@nestjs/common'
import { FileUploadController } from './controllers/file-upload/file-upload.controller'
import { PrismaService } from './services/prisma.service'

@Module({
  // imports: [
  //   RabbitMQModule.forRoot(RabbitMQModule, {
  //     uri: 'amqp://message@admin:patinhas_dev1234@rabbitmq:5672'
  //   })
  // ],
  providers: [PrismaService],
  exports: [
    PrismaService
    // RabbitMQModule.forRoot(RabbitMQModule, {
    //   uri: 'amqp://message@admin:patinhas_dev1234@rabbitmq:5672'
    // })
  ],
  controllers: [FileUploadController]
})
export class SharedModule {}
