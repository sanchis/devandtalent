import { Client, ClientCreate, ClientUpdate } from '../domain/entities/Client'
import { ClientPort } from '../domain/ports/client.port'
import NotFoundError from './errors/NotFound.error'

export interface ClientServiceModel {
  deleteClient: (id: string) => Promise<void>
  updateClient: (id: string, client: ClientUpdate) => Promise<Client|undefined>
  createClient: (client: ClientCreate) => Promise<Client>
  findByIdClient: (id: string) => Promise<Client|undefined>
  findAllClients: () => Promise<Client[]>
}

export default function UserService (adapter: ClientPort): ClientServiceModel {
  const deleteClient = async (id: string): Promise<void> => {
    await findByIdClient(id)
    return await adapter.delete(id)
  }

  async function updateClient (id: string, client: ClientUpdate): Promise<Client|undefined> {
    await findByIdClient(id)
    return await adapter.update(id, client)
  }

  const createClient = async (client: ClientCreate): Promise<Client> => {
    return await adapter.create(client)
  }

  const findByIdClient = async (id: string): Promise<Client|undefined> => {
    const clientExist = await adapter.findById(id)
    if (!clientExist) {
      throw new NotFoundError('Client not found')
    }
    return await adapter.findById(id)
  }

  const findAllClients = async (): Promise<Client[]> => {
    return await adapter.findAll()
  }

  return {
    deleteClient,
    updateClient,
    createClient,
    findByIdClient,
    findAllClients
  }
}
