import { getRepository } from 'typeorm'
import { Client, ClientCreate, ClientUpdate } from '../../../domain/entities/Client'
import { ClientPort } from '../../../domain/ports/client.port'
import { ClientEntity } from './schemas/Client.entity'

export default function clientRepository (): ClientPort {
  const repository = getRepository(ClientEntity)

  const findById = async (id: string): Promise<Client|undefined> => {
    return await repository.findOne(id)
  }

  const findAll = async (): Promise<Client[]> => {
    return await repository.find()
  }

  const create = async (user: ClientCreate): Promise<Client> => {
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

  const update = async (id: string, user: ClientUpdate): Promise<Client | undefined> => {
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
