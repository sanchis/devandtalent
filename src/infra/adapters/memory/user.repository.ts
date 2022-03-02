import { UserAdapter } from '../../../domain/user.adapter'
import { User, UserCreate } from '../../../domain/entities/User'
import { v4 as uuidv4 } from 'uuid'

export default class UserMemoryRepository implements UserAdapter {
  private readonly users: User[] = []

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
}
