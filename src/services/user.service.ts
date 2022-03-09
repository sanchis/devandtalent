import { User, UserCreate, UserUpdate } from '../domain/entities/User'
import { UserPort } from '../domain/ports/user.port'
import NotFoundError from './errors/NotFound.error'

export interface UserServiceModel {
  deleteUser: (id: string) => Promise<void>
  updateUser: (id: string, user: UserUpdate) => Promise<User|undefined>
  createUser: (user: UserCreate) => Promise<User>
  findByIdUser: (id: string) => Promise<User|undefined>
  findAllUsers: () => Promise<User[]>
}

export default function UserService (adapter: UserPort): UserServiceModel {
  const deleteUser = async (id: string): Promise<void> => {
    await findByIdUser(id)
    return await adapter.delete(id)
  }

  async function updateUser (id: string, user: UserUpdate): Promise<User|undefined> {
    await findByIdUser(id)
    return await adapter.update(id, user)
  }

  const createUser = async (user: UserCreate): Promise<User> => {
    return await adapter.create(user)
  }

  const findByIdUser = async (id: string): Promise<User|undefined> => {
    const userExist = await adapter.findById(id)
    if (!userExist) {
      throw new NotFoundError('User not found')
    }
    return await adapter.findById(id)
  }

  const findAllUsers = async (): Promise<User[]> => {
    return await adapter.findAll()
  }

  return {
    deleteUser,
    updateUser,
    createUser,
    findByIdUser,
    findAllUsers
  }
}
