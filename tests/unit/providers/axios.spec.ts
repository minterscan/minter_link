import { ErrorCode } from '@/model/Error'
import axios, { responseInterceptor } from '@/providers/AxiosProvider'

jest.mock('axios')

it('add interceptors', () => {
  responseInterceptor(axios)

  expect(axios.interceptors.response.use).toHaveBeenCalled()
})

it('intercept success response', async () => {
  responseInterceptor(axios)

  const interceptorSuccessHandler = (axios.interceptors.response.use as jest.Mock).mock.calls[0][0]

  try {
    await interceptorSuccessHandler()

    expect(true).toBeTruthy()
  } catch {
    // should not be called
    expect(true).toBeFalsy()
  }
})

it('intercept error response without error code', async () => {
  responseInterceptor(axios)

  const interceptorErrorHandler = (axios.interceptors.response.use as jest.Mock).mock.calls[0][1]

  try {
    await interceptorErrorHandler({})
    // should not be called
    expect(true).toBeFalsy()
  } catch (e) {
    expect(e.message).toEqual(ErrorCode.NetworkError)
  }
})

it('intercept error response with error code', async () => {
  responseInterceptor(axios)

  const interceptorErrorHandler = (axios.interceptors.response.use as jest.Mock).mock.calls[0][1]

  try {
    await interceptorErrorHandler({
      response: {
        data: {
          error: {
            code: ErrorCode.StakeNotFound
          }
        }
      }
    })
    // should not be called
    expect(true).toBeFalsy()
  } catch (e) {
    expect(e.message).toEqual(ErrorCode.StakeNotFound)
  }
})
