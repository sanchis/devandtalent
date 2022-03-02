import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { UserUseCase } from '../../../../../usecases'
import { findByIdSchema, usersSchema } from './schemas'

interface GetByIdParams {
  id: string
}

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.get('/:id', { schema: findByIdSchema }, async (request: FastifyRequest<{
    Params: GetByIdParams
  }>, reply: FastifyReply) => {
    const user = await UserUseCase.findById(request.params.id)
    return await reply.send(user)
  })

  fastify.get('/', { schema: usersSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
    return await reply.send([])
  })
}
