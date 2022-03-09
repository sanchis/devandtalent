import UserTypeormRepository from '../infra/persistence/typeorm/user.repository'
import ClientTypeormRepository from '../infra/persistence/typeorm/client.repository'
import userSrv from './user.service'
import clientSrv from './client.service'

const userAdapter = UserTypeormRepository()
const clientAdapter = ClientTypeormRepository()

export const userService = userSrv(userAdapter)
export const clientService = clientSrv(clientAdapter)
