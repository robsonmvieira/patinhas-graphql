import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

import { verify } from 'jsonwebtoken'
import { PrismaService } from './prisma.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('authorization' in req.headers) {
      const token = req.headers['authorization']
      const jwtToken = token.split(' ')[1]
      const decoded = verify(jwtToken, `${process.env.SECRET_KEY}`)

      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const response = await this.prismaService.user.findFirst(
            decoded['id']
          )
          req['user'] = response
        } catch (error) {
          console.log('error', error)
        }
      }
    }
    next()
  }
}
