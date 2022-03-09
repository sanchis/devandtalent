import { getRepository } from 'typeorm'
import { JobRequestPort } from '../../../domain/ports/job-request.port'
import { JobRequestEntity } from './schemas/JobRequest.entity'
import { JobRequest, JobRequestCreate, JobRequestUpdate } from '../../../domain/entities/JobRequest'

export default function jobRequestRepository (): JobRequestPort {
  const repository = getRepository(JobRequestEntity)

  const findById = async (id: string): Promise<JobRequest|undefined> => {
    return await repository.findOne(id, { relations: ['client'] })
  }

  const findAll = async (): Promise<JobRequest[]> => {
    return await repository.find()
  }

  const create = async (jobRequest: JobRequestCreate): Promise<JobRequest | undefined> => {
    const result = await repository.insert(jobRequest)
    const idCreated = result.identifiers.at(0)?.id
    return await findById(idCreated)
  }

  const erase = async (id: string): Promise<void> => {
    await repository.delete(id)
  }

  const update = async (id: string, jobRequest: JobRequestUpdate): Promise<JobRequest | undefined> => {
    await repository.update({
      id
    }, jobRequest)
    return await findById(id)
  }

  return {
    findAll,
    findById,
    create,
    delete: erase,
    update
  }
}
