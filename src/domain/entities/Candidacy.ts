import { JobRequest } from './JobRequest'
import { User } from './User'

export interface Candidacy {
  id: string
  jobRequest: JobRequest
  user: User
  state: CandidacyState
}

export enum CandidacyState {
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED'
}

export interface CandidacyUserId {
  userId: string
}

export interface CandidacyJobRequestId {
  jobRequestId: string
}

export type CandidacyCreate = Omit<Candidacy, 'id' | 'user' | 'jobRequest'> & CandidacyUserId & CandidacyJobRequestId
export type CandidacyUpdate = Omit<Candidacy, 'id' | 'user' | 'jobRequest'> & CandidacyUserId & CandidacyJobRequestId
