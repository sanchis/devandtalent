import { getRepository } from 'typeorm'
import { JobRequestPort } from '../../../domain/ports/job-request.port'
import { JobRequestEntity } from './schemas/JobRequest.entity'
import { JobRequest, JobRequestCreate, JobRequestUpdate } from '../../../domain/entities/JobRequest'

export default function jobRequestRepository (): JobRequestPort {
  const repository = getRepository(JobRequestEntity)

  const findById = async (id: string): Promise<JobRequest|undefined> => {
    return await repository.findOne(id)
  }

  const findAll = async (): Promise<JobRequest[]> => {
    return await repository.find()
  }

  const create = async (jobRequest: JobRequestCreate): Promise<JobRequest | undefined> => {
    const { clientId, ...rest } = jobRequest
    const jbRequest = repository.create({
      ...rest,
      client: { id: clientId }
    })
    const result = await repository.insert(jbRequest)
    const idCreated = result.identifiers.at(0)?.id
    return await findById(idCreated)
  }

  const erase = async (id: string): Promise<void> => {
    await repository.delete(id)
  }

  const update = async (id: string, jobRequest: JobRequestUpdate): Promise<JobRequest | undefined> => {
    const { clientId, ...rest } = jobRequest
    const jbRequest = repository.create({
      ...rest,
      client: { id: clientId }
    })
    await repository.update({ id }, jbRequest)
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
