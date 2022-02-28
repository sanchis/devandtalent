import { User } from '../domain/entities/User'

export interface UserAbstractRepository{
  findById: (id: string) => Promise<User|undefined>
}
