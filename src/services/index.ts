import userTypeormRepository from '../infra/persistence/typeorm/user.repository'
import clientTypeormRepository from '../infra/persistence/typeorm/client.repository'
import userSrv from './user.service'
import jobRequestSrv from './job-request.service'
import clientSrv from './client.service'
import candidacySrv from './candidacy.service'
import jobRequestRepository from '../infra/persistence/typeorm/job-request.repository'
import candidacyRepository from '../infra/persistence/typeorm/candidacy.repository'

const userAdapter = userTypeormRepository()
const clientAdapter = clientTypeormRepository()
const jobRequestAdapter = jobRequestRepository()
const candidacyAdapter = candidacyRepository()

export const userService = userSrv(userAdapter)
export const clientService = clientSrv(clientAdapter)
export const jobRequestService = jobRequestSrv(jobRequestAdapter, clientService)
export const candidacyService = candidacySrv(candidacyAdapter, jobRequestService, userService)
