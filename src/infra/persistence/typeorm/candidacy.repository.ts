import { getRepository } from 'typeorm'
import { Candidacy, CandidacyCreate, CandidacyUpdate } from '../../../domain/entities/Candidacy'
import { CandidacyPort } from '../../../domain/ports/candidacy.port'
import { CandidacyEntity } from './schemas/Candidacy.entity'

export default function candidacyRepository (): CandidacyPort {
  const repository = getRepository(CandidacyEntity)

  const findById = async (id: string): Promise<Candidacy|undefined> => {
    return await repository.findOne(id)
  }

  const findAll = async (): Promise<Candidacy[]> => {
    return await repository.find()
  }

  const create = async (obj: CandidacyCreate): Promise<Candidacy| undefined> => {
    const { jobRequestId, userId, ...rest } = obj
    const objForCreate = repository.create({
      jobRequest: {
        id: jobRequestId
      },
      user: {
        id: userId
      },
      ...rest
    })
    const result = await repository.insert(objForCreate)
    const idCreated = result.identifiers.at(0)?.id
    return await findById(idCreated)
  }

  const erase = async (id: string): Promise<void> => {
    await repository.delete(id)
  }

  const update = async (id: string, obj: CandidacyUpdate): Promise<Candidacy | undefined> => {
    const { jobRequestId, userId, ...rest } = obj
    const objForCreate = repository.create({
      jobRequest: {
        id: jobRequestId
      },
      user: {
        id: userId
      },
      ...rest
    })
    await repository.update(id, objForCreate)
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
