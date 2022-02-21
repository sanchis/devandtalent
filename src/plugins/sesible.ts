import { FastifyInstance, FastifyPluginOptions, FastifyRegisterOptions } from 'fastify'
import fp from 'fastify-plugin'
import fastifySensible from 'fastify-sensible'
/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp(async function (fastify: FastifyInstance, opts: FastifyRegisterOptions<FastifyPluginOptions>) {
  void fastify.register(fastifySensible, {
    errorHandler: false
  })
})
