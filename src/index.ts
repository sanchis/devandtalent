import Fastify from 'fastify'
import pluginsRegister from './plugin-register'
import dotenv from 'dotenv'
import LoggerConfig from './utils/LoggerConfig'
dotenv.config()

const app = Fastify({
  logger: LoggerConfig()
})

void app.register(pluginsRegister)

app.listen(3000, (error: Error| null, address: string) => {
  if (error) {
    app.log.error(error)
    process.exit(1)
  }
})
