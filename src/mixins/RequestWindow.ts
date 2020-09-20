import Base from '@/mixins/Base'
import { ECoin } from '@/model/Wallet'
import { Merchant } from 'minter-connect'
import { Component, Mixins } from 'vue-property-decorator'

/**
 * Request Window
 */

@Component
export default class RequestWindow extends Mixins(Base) {
  tabId = 0
  loading = false
  coin: string = ECoin.BIP
  merchant: Merchant | null = null

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
