import config from '@/config'
import { getQuery } from '@/services/Util'
import axios from '@/providers/AxiosProvider'
import {
  EstimateBuyRequest,
  EstimateSellRequest,
  EstimateSellAllRequest,
  EstimateResponse
} from '@/model/Estimate'

const baseUrl = config.gateApiBaseUrl

/**
 * Gate data provider
*/
export default class GateProvider {
  /**
   * Get address nonce
   *
   * @param address
   */
  static async getNonce (address: string): Promise<number> {
    const response = await axios.get(`${baseUrl}/nonce/${address}`)

    return parseInt(response.data.data.nonce)
  }

  /**
   * Send transaction to gate
   *
   * @param serializedTx
   */
  static async txSend (serializedTx: string): Promise<string> {
    const response = await axios.post(`${baseUrl}/transaction/push`, {
      transaction: serializedTx
    })

    return response.data.data.hash
  }

  /**
   * Get Tx.BuyCoin estimate
   *
   * @param data
   */
  static async estimateBuy (data: EstimateBuyRequest): Promise<EstimateResponse> {
    const response = await axios.get(`${baseUrl}/estimate/coin-buy?${getQuery(data)}`)

    return response.data.data
  }

  /**
   * Get Tx.SellCoin estimate
   *
   * @param data
   */
  static async estimateSell (data: EstimateSellRequest | EstimateSellAllRequest): Promise<EstimateResponse> {
    const response = await axios.get(`${baseUrl}/estimate/coin-sell?${getQuery(data)}`)

    return response.data.data
  }
}
