import { JobRequest, JobRequestCreate, JobRequestUpdate } from '../entities/JobRequest'

export interface JobRequestPort{
  findById: (id: string) => Promise<JobRequest|undefined>
  findAll: () => Promise<JobRequest[]>
  create: (requestJob: JobRequestCreate) => Promise<JobRequest|undefined>
  delete: (id: string) => Promise<void>
  update: (id: string, requestJob: JobRequestUpdate) => Promise<JobRequest|undefined>
}
