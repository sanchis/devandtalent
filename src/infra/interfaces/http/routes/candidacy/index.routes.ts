import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { CandidacyCreate, CandidacyUpdate } from '../../../../../domain/entities/Candidacy'
import { candidacyService } from '../../../../../services'
import { findByIdSchema, findAllSchema, createSchema, deleteByIdSchema, updateByIdSchema } from './schemas'

// TODO move to other folder
interface GetByIdParams {
  id: string
}

type DeleteByIdParams = GetByIdParams
type UpdateByIdParams = GetByIdParams
type UpdateBody = CandidacyUpdate
type CreateBody = CandidacyCreate

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.get('/:id', { schema: findByIdSchema }, async (request: FastifyRequest<{
    Params: GetByIdParams
  }>, reply: FastifyReply) => {
    const client = await candidacyService?.findByIdCandidacyOrFail(request.params.id)
    return await reply.send(client)
  })

  fastify.get('/', { schema: findAllSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
    return await reply.send(await candidacyService?.findAllCandidacies())
  })

  fastify.post('/', { schema: createSchema }, async (request: FastifyRequest<{
    Body: CreateBody
  }>, reply: FastifyReply) => {
    return await reply.send(await candidacyService?.createCandidacy(request.body))
  })

  fastify.delete('/:id', { schema: deleteByIdSchema }, async (request: FastifyRequest<{
    Params: DeleteByIdParams
  }>, reply: FastifyReply) => {
    return await reply.send(await candidacyService?.deleteCandidacy(request.params.id))
  })

  fastify.put('/:id', { schema: updateByIdSchema }, async (request: FastifyRequest<{
    Params: UpdateByIdParams
    Body: UpdateBody
  }>, reply: FastifyReply) => {
    return await reply.send(await candidacyService?.updateCandidacy(request.params.id, request.body))
  })
}
