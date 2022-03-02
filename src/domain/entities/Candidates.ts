export interface Candidate {
  id: string
  job_request: string
  user: string
  state: CandidateState
}

export enum CandidateState {
  REJECTED,
  PENDING,
  ACCEPTED
}
