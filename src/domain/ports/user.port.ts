import { User, UserCreate } from '../entities/User'

export interface UserPort{
  findById: (id: string) => Promise<User|undefined>
  findAll: () => Promise<User[]>
  create: (user: UserCreate) => Promise<User>
  delete: (id: string) => Promise<void>
}
