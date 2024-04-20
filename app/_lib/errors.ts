import { ERROR_CODE, ERROR_MESSAGES } from './messages'

export function isAppError(error: any, errorClass: any = AppError): boolean {
  return error instanceof errorClass
}

export class AppError extends Error {
  public code: string
  public error?: Error

  constructor(code: string, error?: Error) {
    super(error?.message)
    this.code = code
    this.error = error
  }

  public isConflict() {
    return ERROR_CODE.CONFLICT == this.code
  }

  public getDisplayMessage() {
    if (ERROR_MESSAGES[this.code]) {
      return ERROR_MESSAGES[this.code]
    }
    return ERROR_MESSAGES[ERROR_CODE.SERVER_UNEXPECTED]
  }
}
