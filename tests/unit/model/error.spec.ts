import { ApplicationError, ErrorCode } from '@/model/Error'

it('create error', () => {
  const instance = new ApplicationError(ErrorCode.Unauthorized)

  expect(instance).toHaveProperty('message')
  expect(instance.message).toEqual(ErrorCode.Unauthorized)
})
