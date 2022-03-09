import { UserPort } from '../../../domain/ports/user.port'
import { User, UserCreate, UserUpdate } from '../../../domain/entities/User'
import { UserEntity } from './schemas/User.entity'
import { getRepository } from 'typeorm'

export default function userRepository (): UserPort {
  const repository = getRepository(UserEntity)

  const findById = async (id: string): Promise<User|undefined> => {
    return await repository.findOne(id)
  }

  const findAll = async (): Promise<User[]> => {
    return await repository.find()
  }

  const create = async (user: UserCreate): Promise<User> => {
    const result = await repository.insert(user)
    const userCreated = {
      ...user,
      id: result.identifiers.at(0)?.id
    }
    return userCreated
  }

  const erase = async (id: string): Promise<void> => {
    await repository.delete(id)
  }

  const update = async (id: string, user: UserUpdate): Promise<User | undefined> => {
    await repository.update({
      id
    }, user)
    return await findById(id)
  }

  return {
    findAll,
    findById,
    create,
    delete: erase,
    update
  }
}
