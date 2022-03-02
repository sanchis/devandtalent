import ErrorBase from './ErrorBase'

export default class NotFoundError extends Error implements ErrorBase {
  readonly statusCode = '404'
  constructor (message: string = 'Resource not found') {
    super(message)
  }
}
