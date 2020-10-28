import Base from '@/mixins/Base'
import { ECoin } from '@/model/Wallet'
import { Merchant } from 'minter-connect'
import { VaultWallets } from '@/model/Vault'
import { Component, Mixins } from 'vue-property-decorator'

/**
 * Request Window
 */

@Component
export default class RequestWindow extends Mixins(Base) {
  tabId = 0
  loading = false
  coin: number = ECoin.BIP
  merchant: Merchant | null = null

  get wallets (): VaultWallets {
    return this.state.vault?.wallets ?? {}
  }

  get balance (): string {
    if (!this.state.wallet) return ''
    if (!this.state.wallet.balances) return ''

    const balance = this.state.wallet.balances.find(item => item.coin.id === this.coin)

    if (!balance) return ''

    return balance.amount
  }

  beforeMount () {
    this.bind()
  }

  // Do some logic before request window close
  bind () {
    window.onbeforeunload = () => {
      if (this.loading) return undefined

      this.beforeClose()

      return undefined
    }
  }

  beforeClose (): void {
    // Just a stub, not implemented in parent class
  }
}
