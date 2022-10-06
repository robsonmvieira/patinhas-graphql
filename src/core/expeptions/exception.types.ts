import { BadRequestException } from "./bad-request.expection";

export enum Exceptions {
  argumentInvalid = 'ArgumentInvalidException',
  argumentOutOfRange = 'ArgumentOutOfRangeException',
  argumentNotProvided = 'ArgumentNotProvidedException',
  notFound = 'NotFoundException',
  domainException = 'DomainException',
  conflict = 'ConflictException',
  validation ='ValidationException',
  badRequest = 'BadRequestException'

}