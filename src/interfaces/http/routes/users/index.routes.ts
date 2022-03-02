import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { UserCreate } from '../../../../domain/entities/User'
import { UserService } from '../../../../services'
import { findByIdSchema, findAllSchema, createSchema } from './schemas'

interface GetByIdParams {
  id: string
}

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.get('/:id', { schema: findByIdSchema }, async (request: FastifyRequest<{
    Params: GetByIdParams
  }>, reply: FastifyReply) => {
    const user = await UserService.findById(request.params.id)
    return await reply.send(user)
  })

  fastify.get('/', { schema: findAllSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
    return await reply.send(await UserService.findAll())
  })

  fastify.post('/', { schema: createSchema }, async (request: FastifyRequest<{
    Body: UserCreate
  }>, reply: FastifyReply) => {
    return await reply.send(await UserService.create(request.body))
  })
}
