import { EntitySchema } from 'typeorm'
import { AvailabilityUser, User } from '../../../../domain/entities/User'

export const UserEntity = new EntitySchema<User>({
  name: 'user',
  columns: {
    availability: {
      type: 'enum',
      enum: AvailabilityUser
    },
    country: {
      type: String
    },
    email: {
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
