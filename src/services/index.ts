import UserTypeormRepository from '../infra/persistence/typeorm/user.repository'
import userSrv from './user.service'

const userAdapter = UserTypeormRepository()
export const userService = userSrv(userAdapter)
