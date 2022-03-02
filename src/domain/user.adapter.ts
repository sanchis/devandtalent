import { User, UserCreate } from './entities/User'

export interface UserAdapter{
  findById: (id: string) => Promise<User|undefined>
  findAll: () => Promise<User[]>
  create: (user: UserCreate) => Promise<User>
}
