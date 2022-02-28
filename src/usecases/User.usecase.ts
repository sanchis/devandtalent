import { User } from '../domain/entities/User'
import { UserAbstractRepository } from '../domain/user.repository'

export default class UserUseCase {
  /**
   *
   */
  constructor (private readonly repository: UserAbstractRepository) {

  }

  async findById (id: string): Promise<User|undefined> {
    console.log('uc', id)
    return await this.repository.findById(id)
  }
}
