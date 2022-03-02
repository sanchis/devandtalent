import { AbstractRepository, EntityRepository } from 'typeorm'
import { UserAdapter } from '../../../domain/user.adapter'
import { User } from '../../../domain/entities/User'
import { UserEntity } from './schemas/User.entity'

@EntityRepository(UserEntity)
export default class UserTypeormRepository extends AbstractRepository<User> implements UserAdapter {
  async findById (id: string): Promise<User|undefined> {
    return await this.repository.findOne(id)
  }

  async findAll (): Promise<User[]> {
    return await this.repository.find()
  }
}
