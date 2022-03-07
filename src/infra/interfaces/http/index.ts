import Fastify from 'fastify'
import 'dotenv/config'
import LoggerConfig from './utils/LoggerConfig'
import { createConnection } from 'typeorm'

const app = Fastify({
  logger: LoggerConfig()
})

// TODO move to other layer
createConnection()
  .then(() => startServer())
  .catch((error: Error) => {
    app.log.error('Error connecting to db')
    app.log.error(error)
    process.exit(2)
  })

const startServer = (): void => {
  void app.register(import('./plugin-register'))
  app.listen(3000, (error: Error | null, address: string) => {
    if (error !== null) {
      app.log.error(error)
      process.exit(1)
    }
  })
}
