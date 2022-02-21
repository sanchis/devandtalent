import { FastifyInstance, FastifyLoggerOptions, LogLevel } from 'fastify'
import fastifyEnv from 'fastify-env'
import path from 'path'

interface ConfigParams {
  LOGGER_LEVEL: LogLevel
  PORT: number
}

declare module 'fastify' {
  interface FastifyInstance {
    config: ConfigParams
  }
}
const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'string'
    }
  }
}

const options = {
  confKey: 'config', // optional, default: 'config'
  schema: schema,
  dotenv: { path: path.join(process.cwd(), '.env') }

}

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify
    .register(fastifyEnv, options)
    .ready((err: Error| null) => {
      if (err) fastify.log.error(err)
    })
}
