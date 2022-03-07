import { UserPort } from '../../../domain/ports/user.port'
import { User, UserCreate, UserUpdate } from '../../../domain/entities/User'
import { v4 as uuidv4 } from 'uuid'

export default class UserMemoryRepository implements UserPort {
  private users: User[] = []

  async findById (id: string): Promise<User|undefined> {
    return await Promise.resolve(this.users.find(user => user.id === id))
  }

  async findAll (): Promise<User[]> {
    return await Promise.resolve(this.users)
  }

  async create (user: UserCreate): Promise<User> {
    const userCreated: User = {
      ...user,
      id: uuidv4()
    }
    this.users.push(userCreated)
    return userCreated
  }

  async delete (id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id)
    return await Promise.resolve()
  }

  async update (id: string, user: UserUpdate): Promise<User|undefined> {
    const indexUser = this.users.findIndex(user => user.id !== id)
    if (indexUser !== -1) {
      this.users[indexUser] = {
        id,
        ...user
      }
      return await Promise.resolve(this.users[indexUser])
    }
    return await Promise.resolve(undefined)
  }
}
