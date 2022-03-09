import { Client, ClientCreate, ClientUpdate } from '../entities/Client'

export interface ClientPort{
  findById: (id: string) => Promise<Client|undefined>
  findAll: () => Promise<Client[]>
  create: (client: ClientCreate) => Promise<Client>
  delete: (id: string) => Promise<void>
  update: (id: string, client: ClientUpdate) => Promise<Client|undefined>
}
