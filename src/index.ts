import Fastify from 'fastify'
import pluginsRegister from './plugin-register'
import 'dotenv/config'
import LoggerConfig from './utils/LoggerConfig'
import { createConnection } from 'typeorm'

const app = Fastify({
  logger: LoggerConfig()
})

void app.register(pluginsRegister)

app.listen(3000, '0.0.0.0', (error: Error | null, address: string) => {
  if (error !== null) {
    app.log.error(error)
    process.exit(1)
  }

  setTimeout(() => {
    createConnection()
      .catch((error: Error) => {
        app.log.error('Error connecting to db')
        app.log.error(error)
        process.exit(2)
      })
  }, 10000)
})
