export interface JobRequest {
  id: string
  client: string
  job_function: string
}

export interface JobRequestClientId {
  client: string
}

export type JobRequestCreate = Omit<JobRequest, 'id'> & JobRequestClientId
export type JobRequestUpdate = Omit<JobRequest, 'id'> & JobRequestClientId
