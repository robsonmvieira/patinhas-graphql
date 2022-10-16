import { RoleUser } from '../../entities'

export class CreateUserInput {
  id: string
  name: string
  email: string
  password: string
  avatar?: string
  role?: RoleUser
}
