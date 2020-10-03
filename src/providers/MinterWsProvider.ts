import { Tx } from '@/model/Tx'
import Centrifuge from 'centrifuge'
import { MinterWalletBalance } from '@/model/Wallet'
import { CentrifugeTxsResponse, CentrifugeAddressResponse } from '@/model/Centrifuge'

/**
 * Minter WebSocket Data Provider
 */
export default class MinterWsProvider {
  public addressSubscriptions: { [key: string]: Centrifuge.Subscription } = {}
  public txsSubscription: Centrifuge.Subscription | undefined = undefined

  /* eslint-disable no-empty-function */
  constructor (public readonly centrifuge: Centrifuge) {}

  /**
   * Connect to server
   */
  connect (): void {
    this.centrifuge.connect()
  }

  /**
   * Subscribe to Transactions channel
   *
   * @param callback
   */
  subscribeToTxs (callback: (tx: Tx) => void): void {
    this.txsSubscription = this.centrifuge.subscribe('transactions', (response: CentrifugeTxsResponse) => {
      callback(response.data)
    })
  }

  /**
   * Subscribe to Address channel
   *
   * @param address
   * @param callback
   */
  subscribeToAddress (address: string, callback: (balances: MinterWalletBalance[]) => void): void {
    if (this.centrifuge.getSub(address)) {
      this.addressSubscriptions[address].subscribe()
    } else {
      this.addressSubscriptions[address] = this.centrifuge.subscribe(address, (response: CentrifugeAddressResponse) => {
        callback(response.data)
      })
    }
  }

  /**
   * Unsubscribe from Transactions channel
   */
  unsubscribeFromTxs (): void {
    if (this.txsSubscription) {
      this.txsSubscription.unsubscribe()
      this.txsSubscription.removeAllListeners()
    }
  }

  /**
   * Unsubscribe from Address channel
   *
   * @param address
   */
  unsubscribeFromAddress (address: string): void {
    if (address in this.addressSubscriptions) {
      this.addressSubscriptions[address].unsubscribe()
    }
  }
}
