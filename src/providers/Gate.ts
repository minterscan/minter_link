import config from '@/config'
import { getQuery } from '@/services/Util'
import axios, { AxiosResponse } from 'axios'
import { ApplicationError } from '@/model/Error'
import { EstimateBuyRequest, EstimateSellRequest, EstimateSellAllRequest } from '@/model/Estimate'

// Response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  throw new ApplicationError(error.response.data.error.code)
})

const baseUrl = config.gateApiBaseUrl

/**
 * Gate data provider
*/
export class GateDataProvider {
  /**
   * Get address nonce
   *
   * @param address
   */
  static async getNonce (address: string): Promise<AxiosResponse> {
    return axios.get(`${baseUrl}/nonce/${address}`)
  }

  /**
   * Send transaction to gate
   *
   * @param serializedTx
   */
  static async txSend (serializedTx: string): Promise<AxiosResponse> {
    return axios.post(`${baseUrl}/transaction/push`, {
      transaction: serializedTx
    })
  }

  /**
   * Get Tx.BuyCoin estimate
   *
   * @param data
   */
  static async estimateBuy (data: EstimateBuyRequest): Promise<AxiosResponse> {
    return axios.get(`${baseUrl}/estimate/coin-buy?${getQuery(data)}`)
  }

  /**
   * Get Tx.SellCoin estimate
   *
   * @param data
   */
  static async estimateSell (data: EstimateSellRequest | EstimateSellAllRequest): Promise<AxiosResponse> {
    return axios.get(`${baseUrl}/estimate/coin-sell?${getQuery(data)}`)
  }
}

export default GateDataProvider
