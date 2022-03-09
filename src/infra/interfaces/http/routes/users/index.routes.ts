import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { UserCreate, UserUpdate } from '../../../../../domain/entities/User'
import { userService } from '../../../../../services'
import { findByIdSchema, findAllSchema, createSchema, deleteByIdSchema, updateByIdSchema } from './schemas'

// TODO move to other folder
interface GetByIdParams {
  id: string
}

type DeleteByIdParams = GetByIdParams
type UpdateByIdParams = GetByIdParams
type UpdateBody = UserUpdate
type CreateBody = UserCreate

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.get('/:id', { schema: findByIdSchema }, async (request: FastifyRequest<{
    Params: GetByIdParams
  }>, reply: FastifyReply) => {
    const user = await userService?.findByIdUser(request.params.id)
    return await reply.send(user)
  })

  fastify.get('/', { schema: findAllSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
    return await reply.send(await userService?.findAllUsers())
  })

  fastify.post('/', { schema: createSchema }, async (request: FastifyRequest<{
    Body: CreateBody
  }>, reply: FastifyReply) => {
    return await reply.send(await userService?.createUser(request.body))
  })

  fastify.delete('/:id', { schema: deleteByIdSchema }, async (request: FastifyRequest<{
    Params: DeleteByIdParams
  }>, reply: FastifyReply) => {
    return await reply.send(await userService?.deleteUser(request.params.id))
  })

  fastify.put('/:id', { schema: updateByIdSchema }, async (request: FastifyRequest<{
    Params: UpdateByIdParams
    Body: UpdateBody
  }>, reply: FastifyReply) => {
    return await reply.send(await userService?.updateUser(request.params.id, request.body))
  })
}
