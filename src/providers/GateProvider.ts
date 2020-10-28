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

    return parseInt(response.data.nonce)
  }

  /**
   * Send transaction to gate
   *
   * @param serializedTx
   */
  static async txSend (serializedTx: string): Promise<string> {
    const response = await axios.post(`${baseUrl}/send_transaction`, {
      tx: serializedTx
    })

    return response.data.hash
  }

  /**
   * Get Tx.BuyCoin estimate
   *
   * @param data
   */
  static async estimateBuy (data: EstimateBuyRequest): Promise<EstimateResponse> {
    const response = await axios.get(`${baseUrl}/estimate_coin_buy?${getQuery(data)}`)

    return response.data
  }

  /**
   * Get Tx.SellCoin estimate
   *
   * @param data
   */
  static async estimateSell (data: EstimateSellRequest | EstimateSellAllRequest): Promise<EstimateResponse> {
    const response = await axios.get(`${baseUrl}/estimate_coin_sell?${getQuery(data)}`)

    return response.data
  }
}
