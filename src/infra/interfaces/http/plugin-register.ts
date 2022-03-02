'use strict'
import { FastifyError, FastifyInstance, FastifyPluginOptions, FastifyRegisterOptions, FastifyRequest } from 'fastify'
import fastifySwagger from 'fastify-swagger'
import fp from 'fastify-plugin'
import fastifySensible from 'fastify-sensible'
import userRoutes from './routes/users/index.routes'
import Rollbar from 'rollbar'

export default async function (fastify: FastifyInstance, opts: FastifyRegisterOptions<FastifyPluginOptions>): Promise<void> {
  void fastify.register(fastifySwagger, {
    routePrefix: '/doc',
    exposeRoute: true,
    swagger: {
      tags: [{ name: 'Users' }],
      info: {
        title: 'Test swagger',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: `localhost:${process.env.PORT as string}`,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
      // tags: [
      //   { name: 'user', description: 'User related end-points' },
      //   { name: 'code', description: 'Code related end-points' }
      // ],
      // definitions: {
      //   User: {
      //     type: 'object',
      //     required: ['id', 'email'],
      //     properties: {
      //       id: { type: 'string', format: 'uuid' },
      //       firstName: { type: 'string' },
      //       lastName: { type: 'string' },
      //       email: { type: 'string', format: 'email' }
      //     }
      //   }
      // },
      // securityDefinitions: {
      //   apiKey: {
      //     type: 'apiKey',
      //     name: 'apiKey',
      //     in: 'header'
      //   }
      // }
    }
  })

  void fp(async function (fastify: FastifyInstance, opts: FastifyRegisterOptions<FastifyPluginOptions>) {
    void fastify.register(fastifySensible, {
      errorHandler: false
    })
  })

  void fastify.register((fastify: FastifyInstance, optis: FastifyRegisterOptions<FastifyPluginOptions>, done: Function) => {
    const rollbar = new Rollbar({
      accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true
    })
    fastify.setErrorHandler((error: FastifyError, request: FastifyRequest) => {
      rollbar.log(error)
    })
    done()
  })

  void fastify.register(userRoutes, { prefix: 'users' })
}
