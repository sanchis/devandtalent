import { FastifySchema, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { UserUseCase } from '../../../../../usecases'

const schema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'the user identifier, as userId'
      }
    },
    required: ['id']
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        },
        availability: {
          type: 'string',
          enum: [
            'WORKING',
            'REQUESTED',
            'FIND_WORK'
          ]
        },
        email: {
          type: 'string'
        },
        country: {
          type: 'string'
        }
      }
    }
  }

}

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.get('/:id', { schema }, async (request: FastifyRequest, reply: FastifyReply) => {
    const user = await UserUseCase.findById(request.params.id)
    return await reply.send(user)
  })
}
