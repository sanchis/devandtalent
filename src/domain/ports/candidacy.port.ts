import { Candidacy, CandidacyCreate, CandidacyUpdate } from '../entities/Candidacy'

export interface CandidacyPort{
  findById: (id: string) => Promise<Candidacy|undefined>
  findAll: () => Promise<Candidacy[]>
  create: (obj: CandidacyCreate) => Promise<Candidacy|undefined>
  delete: (id: string) => Promise<void>
  update: (id: string, obj: CandidacyUpdate) => Promise<Candidacy|undefined>
}
