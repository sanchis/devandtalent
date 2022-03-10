import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { JobRequestCreate, JobRequestUpdate } from '../../../../../domain/entities/JobRequest'
import { jobRequestService } from '../../../../../services'
import { findByIdSchema, findAllSchema, createSchema, deleteByIdSchema, updateByIdSchema } from './schemas'

// TODO move to other folder
interface GetByIdParams {
  id: string
}

type DeleteByIdParams = GetByIdParams
type UpdateByIdParams = GetByIdParams
type UpdateBody = JobRequestUpdate
type CreateBody = JobRequestCreate

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.get('/:id', { schema: findByIdSchema }, async (request: FastifyRequest<{
    Params: GetByIdParams
  }>, reply: FastifyReply) => {
    return await reply.send(await jobRequestService?.findByIdJobRequestOrFail(request.params.id))
  })

  fastify.get('/', { schema: findAllSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
    return await reply.send(await jobRequestService?.findAllJobRequests())
  })

  fastify.post('/', { schema: createSchema }, async (request: FastifyRequest<{
    Body: CreateBody
  }>, reply: FastifyReply) => {
    return await reply.send(await jobRequestService?.createJobRequest(request.body))
  })

  fastify.delete('/:id', { schema: deleteByIdSchema }, async (request: FastifyRequest<{
    Params: DeleteByIdParams
  }>, reply: FastifyReply) => {
    return await reply.send(await jobRequestService?.deleteJobRequest(request.params.id))
  })

  fastify.put('/:id', { schema: updateByIdSchema }, async (request: FastifyRequest<{
    Params: UpdateByIdParams
    Body: UpdateBody
  }>, reply: FastifyReply) => {
    return await reply.send(await jobRequestService?.updateJobRequest(request.params.id, request.body))
  })
}
