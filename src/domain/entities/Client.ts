export interface Client {
  id: string
  name: string
  country: string
}

export type ClientCreate = Omit<Client, 'id'>
export type ClientUpdate = Omit<Client, 'id'>
