import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import Rollbar from 'rollbar'

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
})
export default async function (fastify: FastifyInstance): Promise<void> {
  void fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    rollbar.error(error)
    void reply.send(error)
  })
}
