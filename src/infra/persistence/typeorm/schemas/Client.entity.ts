import { EntitySchema } from 'typeorm'
import { Client } from '../../../../domain/entities/Client'

export const ClientEntity = new EntitySchema<Client>({
  name: 'client',
  columns: {
    country: {
      type: String
    },
    name: {
      type: String
    },
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    }
  }
})
