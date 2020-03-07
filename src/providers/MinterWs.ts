import config from '@/config'
import Centrifuge from 'centrifuge'
import { CentrifugeTxsResponse, CentrifugeAddressResponse} from '@/model/Centrifuge'

/**
 * Minter WebSocket Data Provider
 */
export class MinterWsDataProvider {
  protected centrifuge: Centrifuge = new Centrifuge(config.wsUrl, { debug: true })
  protected walletSubscriptions: { [key: string]: Centrifuge.Subscription } = {}
  protected txsSubscription: Centrifuge.Subscription | null = null

  constructor () {
    this.centrifuge.connect()
  }

  /**
   * Subscribe to Transactions channel
   * 
   * @param callback 
   */
  subscribeToTxs (callback: Function) {
    if (this.centrifuge.getSub('transactions')) return

    this.centrifuge.subscribe('transactions', (response: CentrifugeTxsResponse) => {
      callback(response.data)
    })
  }

  /**
   * Subscribe to Address channel
   * 
   * @param address 
   * @param callback 
   */
  subscribeToWallet (address: string, callback: Function) {
    if (this.centrifuge.getSub(address)) {
      this.walletSubscriptions[address].subscribe()
    } else {
      this.walletSubscriptions[address] = this.centrifuge.subscribe(address, (response: CentrifugeAddressResponse) => {
        callback(response.data)
      })
    }
  }

  /**
   * Unsubscribe from Address channel
   * 
   * @param address
   */
  unsubscribeFromWallet (address: string) {
    if (address in this.walletSubscriptions) {
      this.walletSubscriptions[address].unsubscribe()
      // this.walletSubscriptions[address].removeAllListeners()
    }
  }

  /**
   * Unsubscribe from Transactions channel
   */
  unsubscribeFromTxs () {
    if (this.txsSubscription) this.txsSubscription.unsubscribe()
  }
}

export default new MinterWsDataProvider()
