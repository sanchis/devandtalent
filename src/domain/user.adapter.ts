import { User } from './entities/User'

export interface UserAdapter{
  findById: (id: string) => Promise<User|undefined>
}
