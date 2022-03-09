import { FastifySchema } from 'fastify'

const commonProps: FastifySchema = {
  tags: ['Clients']
}

const clientPropsSchema: unknown = {
  id: {
    type: 'string'
  },
  name: {
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
        properties: clientPropsSchema
      }
    }
  },
  ...commonProps
}

export const createSchema: FastifySchema = {
  ...commonProps,
  body: {
    type: 'object',
    properties: updateCreateSchema
  },
  response: {
    202: {
      type: 'object',
      properties: clientPropsSchema
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
      properties: clientPropsSchema
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
        description: 'the client identifier, as clientId'
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
    properties: updateCreateSchema
  },
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'the client identifier, as clientId'
      }
    },

    required: ['id']
  },
  response: 200
}
