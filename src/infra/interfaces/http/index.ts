import Fastify, { FastifyError, FastifyRequest } from 'fastify'
import pluginsRegister from './plugin-register'
import 'dotenv/config'
import LoggerConfig from './utils/LoggerConfig'
import { createConnection } from 'typeorm'
import Rollbar from 'rollbar'

const app = Fastify({
  logger: LoggerConfig()
})
const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
})
void app.register(pluginsRegister)
app.setErrorHandler((error: FastifyError, request: FastifyRequest) => {
  rollbar.log(error)
})

createConnection()
  .then(() => startServer())
  .catch((error: Error) => {
    app.log.error('Error connecting to db')
    app.log.error(error)
    process.exit(2)
  })

const startServer = (): void => {
  app.listen(3000, (error: Error | null, address: string) => {
    if (error !== null) {
      app.log.error(error)
      process.exit(1)
    }
  })
}
