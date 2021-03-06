import { EntitySchema } from 'typeorm'
import { Candidacy, CandidacyState } from '../../../../domain/entities/Candidacy'

export const CandidacyEntity = new EntitySchema<Candidacy>({
  name: 'candidacy',
  columns: {
    state: {
      type: 'enum',
      enum: CandidacyState
    },
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    }
  },
  relations: {
    // TODO unique user and job request
    jobRequest: {
      target: 'job-request',
      type: 'many-to-one',
      eager: true
    },
    user: {
      target: 'user',
      type: 'many-to-one',
      eager: true
    }
  }
})
