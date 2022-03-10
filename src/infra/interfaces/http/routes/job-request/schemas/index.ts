import { FastifySchema } from 'fastify'
import { clientPropsSchema } from '../../clients/schemas'

const commonProps: FastifySchema = {
  tags: ['Job-Request']
}

const jobRequestPropsSchema: unknown = {
  id: {
    type: 'string'
  },
  job_function: {
    type: 'string'
  },
  client: {
    type: 'object',
    properties: clientPropsSchema
  }
}

const updateCreateSchema: unknown = {
  job_function: {
    type: 'string'
  },
  clientId: {
    type: 'string'
  }
}

export const findAllSchema: FastifySchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: jobRequestPropsSchema
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
    required: ['job_function', 'clientId']
  },
  response: {
    202: {
      type: 'object',
      properties: jobRequestPropsSchema
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
        description: 'the job request identifier'
      }
    },
    required: ['id']
  },
  response: {
    200: {
      type: 'object',
      properties: jobRequestPropsSchema
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
        description: 'the job request identifier'
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
    required: ['job_function', 'clientId']
  },
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'the job request identifier'
      }
    },
    required: ['id']
  },
  response: 200
}
