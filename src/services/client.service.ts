import { Client, ClientCreate, ClientUpdate } from '../domain/entities/Client'
import { ClientPort } from '../domain/ports/client.port'
import NotFoundError from '../domain/errors/NotFound.error'

// TODO move different folder
export interface ClientServiceModel {
  deleteClient: (id: string) => Promise<void>
  updateClient: (id: string, client: ClientUpdate) => Promise<Client|undefined>
  createClient: (client: ClientCreate) => Promise<Client>
  findByIdClient: (id: string) => Promise<Client|undefined>
  findByIdClientOrFail: (id: string) => Promise<Client|undefined>
  findAllClients: () => Promise<Client[]>
}

export default function UserService (adapter: ClientPort): ClientServiceModel {
  const deleteClient = async (id: string): Promise<void> => {
    await findByIdClientOrFail(id)
    return await adapter.delete(id)
  }

  async function updateClient (id: string, client: ClientUpdate): Promise<Client|undefined> {
    await findByIdClientOrFail(id)
    return await adapter.update(id, client)
  }

  const createClient = async (client: ClientCreate): Promise<Client> => {
    return await adapter.create(client)
  }

  const findByIdClient = async (id: string): Promise<Client|undefined> => {
    return await adapter.findById(id)
  }

  const findByIdClientOrFail = async (id: string): Promise<Client|undefined> => {
    const clientExist = await adapter.findById(id)
    if (!clientExist) {
      throw new NotFoundError('Client not found')
    }
    return clientExist
  }

  const findAllClients = async (): Promise<Client[]> => {
    return await adapter.findAll()
  }

  return {
    deleteClient,
    updateClient,
    createClient,
    findByIdClient,
    findByIdClientOrFail,
    findAllClients
  }
}
