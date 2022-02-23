'use strict'

import * as path from 'node:path'
import AutoLoad from 'fastify-autoload'
import { FastifyInstance, FastifyPluginOptions, FastifyRegisterOptions } from 'fastify'

export default async function (fastify: FastifyInstance, opts: FastifyRegisterOptions<FastifyPluginOptions>): Promise<void> {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
