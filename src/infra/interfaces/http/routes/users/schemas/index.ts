import { FastifySchema } from 'fastify'

const commonProps: FastifySchema = {
  tags: ['Users']
}

const userPropsSchema: unknown = {
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
export const findAllSchema: FastifySchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: userPropsSchema
      }
    }
  },
  ...commonProps
}

export const findByIdSchema: FastifySchema = {
  tags: ['Users'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'the user identifier, as userId'
      }
    },
    required: ['id']
  },
  response: {
    200: {
      type: 'object',
      properties: userPropsSchema
    }
  }
}
