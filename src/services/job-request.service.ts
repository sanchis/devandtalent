import { JobRequest, JobRequestCreate, JobRequestUpdate } from '../domain/entities/JobRequest'
import { JobRequestPort } from '../domain/ports/job-request.port'
import NotFoundError from './errors/NotFound.error'

// TODO move different folder
export interface JobRequestServiceModel {
  deleteJobRequest: (id: string) => Promise<void>
  updateJobRequest: (id: string, jobRequest: JobRequestUpdate) => Promise<JobRequest|undefined>
  createJobRequest: (jobRequest: JobRequestCreate) => Promise<JobRequest |undefined>
  findByIdJobRequest: (id: string) => Promise<JobRequest|undefined>
  findAllJobRequests: () => Promise<JobRequest[]>
}

export default function UserService (adapter: JobRequestPort): JobRequestServiceModel {
  const deleteJobRequest = async (id: string): Promise<void> => {
    await findByIdJobRequest(id)
    return await adapter.delete(id)
  }

  async function updateJobRequest (id: string, jobRequest: JobRequestUpdate): Promise<JobRequest|undefined> {
    await findByIdJobRequest(id)
    return await adapter.update(id, jobRequest)
  }

  const createJobRequest = async (jobRequest: JobRequestCreate): Promise<JobRequest| undefined> => {
    return await adapter.create(jobRequest)
  }

  const findByIdJobRequest = async (id: string): Promise<JobRequest|undefined> => {
    const requestExist = await adapter.findById(id)
    if (!requestExist) {
      throw new NotFoundError('JobRequest not found')
    }
    return await adapter.findById(id)
  }

  const findAllJobRequests = async (): Promise<JobRequest[]> => {
    return await adapter.findAll()
  }

  return {
    deleteJobRequest,
    updateJobRequest,
    createJobRequest,
    findByIdJobRequest,
    findAllJobRequests
  }
}
