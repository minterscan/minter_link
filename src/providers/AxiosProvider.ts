import axios, { AxiosInstance } from 'axios'
import { ApplicationError, ErrorCode } from '@/model/Error'

// Response interceptor
export const responseInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.data?.error?.code) {
        throw new ApplicationError(error.response.data.error.code)
      } else {
        throw new ApplicationError(ErrorCode.NetworkError)
      }
    }
  )
}

responseInterceptor(axios)

export default axios
