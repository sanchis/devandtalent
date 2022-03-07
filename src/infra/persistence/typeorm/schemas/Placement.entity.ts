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
    candidacy: {
      type: 'many-to-one',
      target: 'candidacy'
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
