import { AppError, isAppError } from '../../_lib/errors'

describe('isAppError', () => {
  class Fixture {
    public error: any
    public errorClass?: any
    public expected: boolean

    constructor(error: any, errorClass: any, expected: boolean) {
      this.error = error
      this.errorClass = errorClass
      this.expected = expected
    }
  }

  test.each([
    new Fixture(new AppError('test'), undefined, true),
    new Fixture(new AppError('test'), AppError, true),
    new Fixture(new Error('test'), undefined, false),
    new Fixture(new Error('test'), Error, true),
  ])('theory', (fx) => {
    expect(isAppError(fx.error, fx.errorClass)).toBe(fx.expected)
  })
})
