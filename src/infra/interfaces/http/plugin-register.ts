'use strict'
import { FastifyInstance, FastifyPluginOptions, FastifyRegisterOptions } from 'fastify'
import fastifySwagger from 'fastify-swagger'
import fp from 'fastify-plugin'
import fastifySensible from 'fastify-sensible'
import userRoutes from './routes/users/index.routes'
import clientRoutes from './routes/clients/index.routes'
import jobRequestRoutes from './routes/job-request/index.routes'
import candidacyRoutes from './routes/candidacy/index.routes'
import RollbarLogger from './utils/RollbarLogger'

export default async function (fastify: FastifyInstance, opts: FastifyRegisterOptions<FastifyPluginOptions>): Promise<void> {
  void fastify.register(fastifySwagger, {
    routePrefix: '/doc',
    exposeRoute: true,
    swagger: {
      tags: [{ name: 'Users' }, { name: 'Clients' }, { name: 'Candidacy' }, { name: 'Job-Request' }],
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: `localhost:${process.env.PORT}`,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  })

  void fp(async function (fastify: FastifyInstance, opts: FastifyRegisterOptions<FastifyPluginOptions>) {
    void fastify.register(fastifySensible, {
      errorHandler: false
    })
  })

  void fastify.register(RollbarLogger)

  void fastify.register(userRoutes, { prefix: 'users' })
  void fastify.register(clientRoutes, { prefix: 'clients' })
  void fastify.register(jobRequestRoutes, { prefix: 'job-request' })
  void fastify.register(candidacyRoutes, { prefix: 'candidacy' })
}
