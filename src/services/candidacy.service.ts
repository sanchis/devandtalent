import NotFoundError from '../domain/errors/NotFound.error'
import { Candidacy, CandidacyCreate, CandidacyUpdate } from '../domain/entities/Candidacy'
import { JobRequestServiceModel } from './job-request.service'
import { UserServiceModel } from './user.service'
import { CandidacyPort } from '../domain/ports/candidacy.port'

// TODO move different folder
export interface CandidacyServiceModel {
  deleteCandidacy: (id: string) => Promise<void>
  updateCandidacy: (id: string, obj: CandidacyUpdate) => Promise<Candidacy|undefined>
  createCandidacy: (obj: CandidacyCreate) => Promise<Candidacy |undefined>
  findByIdCandidacy: (id: string) => Promise<Candidacy|undefined>
  findByIdCandidacyOrFail: (id: string) => Promise<Candidacy|undefined>
  findAllCandidacies: () => Promise<Candidacy[]>
}

export default function CandidacyService (adapter: CandidacyPort, jbRequest: JobRequestServiceModel, user: UserServiceModel): CandidacyServiceModel {
  const deleteCandidacy = async (id: string): Promise<void> => {
    await findByIdCandidacyOrFail(id)
    return await adapter.delete(id)
  }

  async function updateCandidacy (id: string, obj: CandidacyUpdate): Promise<Candidacy|undefined> {
    await jbRequest.findByIdJobRequestOrFail(obj.jobRequestId)
    await user.findByIdUserOrFail(obj.userId)
    await findByIdCandidacyOrFail(id)
    return await adapter.update(id, obj)
  }

  const createCandidacy = async (obj: CandidacyCreate): Promise<Candidacy| undefined> => {
    await jbRequest.findByIdJobRequestOrFail(obj.jobRequestId)
    await user.findByIdUserOrFail(obj.userId)
    return await adapter.create(obj)
  }

  const findByIdCandidacy = async (id: string): Promise<Candidacy|undefined> => {
    return await adapter.findById(id)
  }

  const findByIdCandidacyOrFail = async (id: string): Promise<Candidacy|undefined> => {
    const requestExist = await adapter.findById(id)
    if (!requestExist) {
      throw new NotFoundError('Candidacy not found')
    }
    return await adapter.findById(id)
  }

  const findAllCandidacies = async (): Promise<Candidacy[]> => {
    return await adapter.findAll()
  }

  return {
    deleteCandidacy,
    updateCandidacy,
    createCandidacy,
    findByIdCandidacy,
    findByIdCandidacyOrFail,
    findAllCandidacies
  }
}
