export interface User {
  id: string
  name: string
  availability: AvailabilityUser
  email: string
  country: string
}

export type UserCreate = Omit<User, 'id'>
export type UserUpdate = Omit<User, 'id'>

export enum AvailabilityUser{
  FIND_WORK = 'FIND_WORK',
  REQUESTED= 'REQUESTED',
  WORKING ='WORKING'
}
