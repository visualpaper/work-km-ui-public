export const ERROR_CODE = {
  CONFLICT: '',
  SERVER_UNEXPECTED: 'BASE-0000',
  SAMPLE_ERROR: 'BASE-0001',
  CLIENT_ERROR: 'CLIENT_ERROR', // これは内部用
}

export const ERROR_MESSAGES = {
  [ERROR_CODE.CONFLICT]: 'Conflict',
  [ERROR_CODE.SERVER_UNEXPECTED]: 'Server unexpected',
  [ERROR_CODE.SAMPLE_ERROR]: 'Sample Error',
  [ERROR_CODE.CLIENT_ERROR]: 'Client Erorr',
}
