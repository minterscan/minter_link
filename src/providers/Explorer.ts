import axios from 'axios'
import config from '@/config'
import { Coin } from '@/model/Coin'
import { Validator } from '@/model/Validator'
import { ExplorerAddressTxsRequest } from '@/model/Explorer'
import { MinterWalletBalance, MinterWalletDelegations, MinterWalletTxs } from '@/model/Wallet'

const baseUrl = config.explorerApiBaseUrl

/**
 * Explorer Data Provider
 */
export class ExplorerDataProvider {
  /**
   * Get address balances
   *
   * @param address
   */
  static async getAddress (address: string): Promise<MinterWalletBalance[]> {
    const response = await axios.get(`${baseUrl}/addresses/${address}`)

    return response.data.data.balances
  }

  /**
   * Get address transactions
   *
   * @param data
   */
  static async getAddressTxs (data: ExplorerAddressTxsRequest): Promise<MinterWalletTxs> {
    const url = `${baseUrl}/addresses/${data.address}/transactions?page=${data.page}&limit=${data.limit}`
    const response = await axios.get(url)

    return response.data
  }

  /**
   * Get address delegations
   *
   * @param address
   */
  static async getAddressDelegations (address: string): Promise<MinterWalletDelegations> {
    const response = await axios.get(`${baseUrl}/addresses/${address}/delegations`)

    return response.data
  }

  /**
   * Get Network validators list
   */
  static async getValidators (): Promise<Validator[]> {
    const response = await axios.get(`${baseUrl}/validators`)

    return response.data.data
  }

  /**
   * Get Network coins list
   */
  static async getCoins (): Promise<Coin[]> {
    const response = await axios.get(`${baseUrl}/coins`)

    return response.data.data
  }
}

export default ExplorerDataProvider
