import { EntitySchema } from 'typeorm'
import { Placement } from '../../../../domain/entities/Placement'

export const PlacementEntity = new EntitySchema<Placement>({
  name: 'placement',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    }
  },
  relations: {
    candidate: {
      type: 'many-to-one',
      target: 'candidate'
    },
    client: {
      type: 'many-to-one',
      target: 'client'
    },
    user: {
      type: 'many-to-one',
      target: 'user'
    }
  }
})
