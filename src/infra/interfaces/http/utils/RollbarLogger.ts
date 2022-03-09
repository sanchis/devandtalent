import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import rollbar from '../../rollbar'

export default async function (fastify: FastifyInstance): Promise<void> {
  void fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    rollbar.error(error)
    void reply.send(error)
  })
}
