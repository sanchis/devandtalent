import { User, UserCreate } from '../domain/entities/User'
import { UserPort } from '../domain/ports/user.port'

export default class UserService {
  /**
   *
   */
  constructor (private readonly adapter: UserPort) {

  }

  async findById (id: string): Promise<User|undefined> {
    return await this.adapter.findById(id)
  }

  async findAll (): Promise<User[]> {
    return await this.adapter.findAll()
  }

  async create (user: UserCreate): Promise<User> {
    return await this.adapter.create(user)
  }
}
