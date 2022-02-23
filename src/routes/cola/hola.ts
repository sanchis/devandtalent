import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.get('/hola', async (request: FastifyRequest, reply: FastifyReply) => {
    void reply.send({ result: 'd' })
  })
}
