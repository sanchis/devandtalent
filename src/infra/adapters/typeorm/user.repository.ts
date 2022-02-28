import { AbstractRepository, EntityRepository } from 'typeorm'
import { UserAbstractRepository } from '../../../domain/user.repository'
import { User } from '../../../domain/entities/User'
import { UserEntity } from './schemas/User.entity'

@EntityRepository(UserEntity)
export default class UserTypeormRepository extends AbstractRepository<User> implements UserAbstractRepository {
  async findById (id: string): Promise<User|undefined> {
    return await this.repository.findOne(id)
  }
}
