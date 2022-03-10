import { Client } from './Client'

export interface JobRequest {
  id: string
  client: Client
  job_function: string
}

export interface JobRequestClientId {
  clientId: string
}

export type JobRequestCreate = Omit<JobRequest, 'id' | 'client'> & JobRequestClientId
export type JobRequestUpdate = Omit<JobRequest, 'id' | 'client'> & JobRequestClientId
