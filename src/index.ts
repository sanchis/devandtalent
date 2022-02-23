import Fastify from 'fastify'
import pluginsRegister from './plugin-register'
import 'dotenv/config'
import LoggerConfig from './utils/LoggerConfig'
import { createConnection } from 'typeorm'

const app = Fastify({
  logger: LoggerConfig()
})

void app.register(pluginsRegister)

app.ready(err => {
  if (!err) {
    app.swagger()
  }
})
app.listen(3000, (error: Error | null, address: string) => {
  if (error !== null) {
    app.log.error(error)
    process.exit(1)
  }

  createConnection()
    .catch((error: Error) => {
      app.log.error('Error conecting to db')
      app.log.error(error)
      process.exit(2)
    })
})
