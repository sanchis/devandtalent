import { User } from '../domain/entities/User'
import { UserAdapter } from '../domain/user.adapter'

export default class UserUseCase {
  /**
   *
   */
  constructor (private readonly adapter: UserAdapter) {

  }

  async findById (id: string): Promise<User|undefined> {
    return await this.adapter.findById(id)
  }

  async findAll (): Promise<User[]> {
    return await this.adapter.findAll()
  }
}
