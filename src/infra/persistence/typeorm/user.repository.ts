import { AbstractRepository, EntityRepository } from 'typeorm'
import { UserPort } from '../../../domain/ports/user.port'
import { User, UserCreate, UserUpdate } from '../../../domain/entities/User'
import { UserEntity } from './schemas/User.entity'

@EntityRepository(UserEntity)
export default class UserTypeormRepository extends AbstractRepository<User> implements UserPort {
  async findById (id: string): Promise<User|undefined> {
    return await this.repository.findOne(id)
  }

  async findAll (): Promise<User[]> {
    return await this.repository.find()
  }

  async create (user: UserCreate): Promise<User> {
    const result = await this.repository.insert(user)
    const userCreated = {
      ...user,
      id: result.identifiers.at(0)?.id
    }
    return userCreated
  }

  async delete (id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async update (id: string, user: UserUpdate): Promise<User | undefined> {
    await this.repository.update({
      id
    }, user)
    return await this.findById(id)
  }
}
