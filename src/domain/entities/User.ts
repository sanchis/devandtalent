export interface User {
  id: string
  name: string
  availability: AvailabilityUser
  email: string
  country: string
}

export enum AvailabilityUser{
  FIND_WORK = 'FIND_WORK',
  REQUESTED= 'REQUESTED',
  WORKING ='WORKING'
}
