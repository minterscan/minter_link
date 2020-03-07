import Base from '@/mixins/Base'
import { MinterWalletBalance } from '@/model/Wallet'
import { Component, Mixins, Watch } from 'vue-property-decorator'

@Component
export default class Wallet extends Mixins(Base) {
  @Watch('state.wallet.address', { immediate: true })
  onWalletAddressChange (address: string, oldAddress: string) {
    if (!address) return

    this.unsubscribe(oldAddress)
    this.fetch(address)
    this.subscribe(address)
  }

  async fetch (address: string) {
    try {
      const balances = await this.postman.getAddressBalances(address)

      this.state.commitVaultWalletBalance({ address: address, balances })
    } catch (e) {
      this.ui.commitError('Can not load balances')
    }
  }

  subscribe (address: string) {
    this.ws.subscribeToWallet(address, this.onBalanceUpdate)
  }

  unsubscribe (address: string) {
    if (address) this.ws.unsubscribeFromWallet(address)
  }

  onBalanceUpdate (balances: MinterWalletBalance[]) {
    if (!this.state.wallet) return

    this.state.commitVaultWalletBalance({
      address: this.state.wallet.address,
      balances
    })
  }

  destroyed (): void {
    if (this.state.wallet) this.unsubscribe(this.state.wallet.address)
  }
}
