import UserSRV from './user.service'
import UserTypeormRepository from '../infra/persistence/typeorm/user.repository'
import { getCustomRepository } from 'typeorm'

export const UserService = new UserSRV(getCustomRepository(UserTypeormRepository))
