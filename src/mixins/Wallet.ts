import Base from '@/mixins/Base'
import { MinterWalletBalance } from '@/model/Wallet'
import { Component, Mixins, Watch } from 'vue-property-decorator'

@Component
export default class Wallet extends Mixins(Base) {
  @Watch('state.wallet.address', { immediate: true })
  onWalletAddressChange (address: string, oldAddress: string): void {
    if (!address) return

    this.unsubscribe(oldAddress)
    this.fetch(address)
    this.subscribe(address)
  }

  // Fetch wallet balances from explorer
  async fetch (address: string): Promise<void> {
    try {
      const balances = await this.postman.getAddressBalances(address)

      this.state.commitVaultWalletBalance({ address: address, balances })
    } catch (e) {
      this.ui.commitError(e)
    }
  }

  // Subscribe to wallet balances updates from explorer WS
  subscribe (address: string): void {
    this.ws.subscribeToAddress(address, this.onBalanceUpdate)
  }

  // Unsubscribe from explorer WS
  unsubscribe (address: string): void {
    if (address) this.ws.unsubscribeFromAddress(address)
  }

  onBalanceUpdate (balances: MinterWalletBalance[]): void {
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
