import { EntitySchema } from 'typeorm'
import { JobRequest } from '../../../../domain/entities/JobRequest'

export const JobRequestEntity = new EntitySchema<JobRequest>({
  name: 'job-request',
  columns: {
    job_function: {
      type: String
    },
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid'
    }
  },
  relations: {
    client: {
      type: 'many-to-one',
      target: 'client'
    }
  }
})
