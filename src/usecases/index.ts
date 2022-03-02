import UserUC from './user.usecase'
import UserTypeormRepository from '../infra/adapters/typeorm/user.repository'
import { getCustomRepository } from 'typeorm'

export const UserUseCase = new UserUC(getCustomRepository(UserTypeormRepository))
