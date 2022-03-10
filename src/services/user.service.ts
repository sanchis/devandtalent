import { User, UserCreate, UserUpdate } from '../domain/entities/User'
import { UserPort } from '../domain/ports/user.port'
import NotFoundError from './errors/NotFound.error'

// TODO move different folder
export interface UserServiceModel {
  deleteUser: (id: string) => Promise<void>
  updateUser: (id: string, user: UserUpdate) => Promise<User|undefined>
  createUser: (user: UserCreate) => Promise<User>
  findByIdUser: (id: string) => Promise<User|undefined>
  findByIdUserOrFail: (id: string) => Promise<User|undefined>
  findAllUsers: () => Promise<User[]>
}

export default function UserService (adapter: UserPort): UserServiceModel {
  const deleteUser = async (id: string): Promise<void> => {
    await findByIdUserOrFail(id)
    return await adapter.delete(id)
  }

  async function updateUser (id: string, user: UserUpdate): Promise<User|undefined> {
    await findByIdUserOrFail(id)
    return await adapter.update(id, user)
  }

  const createUser = async (user: UserCreate): Promise<User> => {
    return await adapter.create(user)
  }

  const findByIdUser = async (id: string): Promise<User|undefined> => {
    return await adapter.findById(id)
  }

  const findByIdUserOrFail = async (id: string): Promise<User|undefined> => {
    const userExist = await adapter.findById(id)
    if (!userExist) {
      throw new NotFoundError('User not found')
    }
    return userExist
  }

  const findAllUsers = async (): Promise<User[]> => {
    return await adapter.findAll()
  }

  return {
    deleteUser,
    updateUser,
    createUser,
    findByIdUser,
    findByIdUserOrFail,
    findAllUsers
  }
}
