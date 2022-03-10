import { FastifySchema } from 'fastify'
import { jobRequestPropsSchema } from '../../job-request/schemas'
import { userPropsSchema } from '../../users/schemas'

const commonProps: FastifySchema = {
  tags: ['Candidacy']
}

export const candidacyPropsSchema: unknown = {
  id: {
    type: 'string',
    format: 'uuid'
  },
  state: {
    type: 'string',
    enum: [
      'REJECTED',
      'PENDING',
      'ACCEPTED'
    ]
  },
  user: {
    type: 'object',
    properties: userPropsSchema
  },
  jobRequest: {
    type: 'object',
    properties: jobRequestPropsSchema
  }
}

const updateCreateSchema: unknown = {
  state: {
    type: 'string',
    enum: [
      'REJECTED',
      'PENDING',
      'ACCEPTED'
    ]
  },
  userId: {
    type: 'string',
    format: 'uuid'
  },
  jobRequestId: {
    type: 'string',
    format: 'uuid'
  }
}

export const findAllSchema: FastifySchema = {
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: candidacyPropsSchema
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
    required: ['state', 'userId', 'jobRequestId']
  },
  response: {
    202: {
      type: 'object',
      properties: candidacyPropsSchema
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
      properties: candidacyPropsSchema
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
    properties: updateCreateSchema,
    required: ['state', 'userId', 'jobRequestId']
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
