import { FastifyLoggerOptions } from 'fastify'

export default function LoggerConfig (): FastifyLoggerOptions {
  return {
    level: process.env.LOGGER_LEVEL,
    prettyPrint: {
      translateTime: 'HH:MM:ss Z'
    }
  }
}
