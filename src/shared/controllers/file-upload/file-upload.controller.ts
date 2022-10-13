import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'
import { AnyFilesInterceptor } from '@nestjs/platform-express'
import * as AWS from 'aws-sdk'

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

const Bucket = `${process.env.AWS_BUCKET_NAME}/products`
// https://patinhas-api-bkt.s3.amazonaws.com/1665698836534pexels-aleksandra-s-13297144.jpg

@Controller('files')
export class FileUploadController {
  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    try {
      const uploads: string[] = []

      const aws = new AWS.S3()
      for (const file of files) {
        const Key = `${Date.now() + file.originalname}`

        await aws
          .putObject({
            Bucket,
            Body: files[0].buffer,
            Key,
            ContentType: file.mimetype
          })
          .promise()
        uploads.push(this.buildFileUrl(Key))
      }
      return uploads
    } catch (error) {
      console.log(error)
    }
  }

  private buildFileUrl(path: string): string {
    const [baseBucketName, folderBucketName] = Bucket.split('/')
    const url = `https://${baseBucketName}.s3.amazonaws.com/${folderBucketName}/${path}`
    return url
  }
}
