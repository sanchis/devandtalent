export interface Candidacy {
  id: string
  job_request: string
  user: string
  state: CandidacyState
}

export enum CandidacyState {
  REJECTED,
  PENDING,
  ACCEPTED
}
