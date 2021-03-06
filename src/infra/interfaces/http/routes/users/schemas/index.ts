import { FastifySchema } from 'fastify'

const commonProps: FastifySchema = {
  tags: ['Users']
}

export const userPropsSchema: unknown = {
  id: {
    type: 'string',
    format: 'uuid'
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

const updateCreateSchema: unknown = {
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

export const createSchema: FastifySchema = {
  ...commonProps,
  body: {
    type: 'object',
    properties: updateCreateSchema,
    required: ['name', 'availability', 'email', 'country']
  },
  response: {
    202: {
      type: 'object',
      properties: userPropsSchema
    }
  }
}

export const findByIdSchema: FastifySchema = {
  ...commonProps,
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

export const deleteByIdSchema: FastifySchema = {
  ...commonProps,
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
  response: 200
}

export const updateByIdSchema: FastifySchema = {
  ...commonProps,
  body: {
    type: 'object',
    properties: updateCreateSchema,
    required: ['name', 'availability', 'email', 'country']
  },
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
  response: 200
}
