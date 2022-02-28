import { EntitySchema } from 'typeorm'
import { Candidate, CandidateState } from '../../../../domain/entities/Candidaces'

export const CandidatesEntity = new EntitySchema<Candidate>({
  name: 'candidate',
  columns: {
    state: {
      type: 'enum',
      enum: CandidateState
    },
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    }
  },
  relations: {
    // TODO unique user and job request
    job_request: {
      target: 'job-request',
      type: 'many-to-one'
    },
    user: {
      target: 'user',
      type: 'many-to-one'
    }
  }
})
