import { User, UserCreate } from '../domain/entities/User'
import { UserPort } from '../domain/ports/user.port'
import NotFoundError from './errors/NotFound.error'

export default class UserService {
  /**
   *
   */
  constructor (private readonly adapter: UserPort) {

  }

  async findById (id: string): Promise<User|undefined> {
    // TODO return 404 if user not exist ?
    return await this.adapter.findById(id)
  }

  async findAll (): Promise<User[]> {
    return await this.adapter.findAll()
  }

  async create (user: UserCreate): Promise<User> {
    return await this.adapter.create(user)
  }

  async delete (id: string): Promise<void> {
    const userExist = await this.adapter.findById(id)
    if (!userExist) {
      throw new NotFoundError('User not found')
    }
    return await this.adapter.delete(id)
  }
}
