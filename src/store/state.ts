import Vue from 'vue'
import { VaultWallets, Vault } from '@/model/Vault'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { MinterWallet, MinterWalletBalance, MinterWalletTxs } from '@/model/Wallet'

@Module({ namespaced: true, name: 'state' })
export default class State extends VuexModule {
  loggedIn = false
  expiry = 0
  vaultExist = false
  vault: Vault | null = null

  /**
   * All wallets
   */
  get wallets (): VaultWallets | undefined {
    return this.vault?.wallets
  }

  /**
   * Active Wallet
   */
  get wallet (): MinterWallet | undefined {
    return this.vault?.wallets[this.vault.activeWallet]
  }

  /**
   * Active Wallet label or address
   */
  get walletLabel (): string {
    if (!this.vault) { return '' }
    if (!this.wallets || !Object.keys(this.wallets).length) { return '' }

    const wallet = this.wallets[this.vault.activeWallet]

    return wallet ? (wallet.meta.label || wallet.address) : ''
  }

  @Mutation
  commitLoggedIn (value: boolean) {
    this.loggedIn = value
  }

  @Mutation
  commitExpiry (value: number) {
    this.expiry = value
  }

  @Mutation
  commitVaultExist (value: boolean) {
    this.vaultExist = value
  }

  @Mutation
  commitVault (vault: Vault | null) {
    this.vault = vault
  }

  @Mutation
  commitVaultActiveWallet (address: string) {
    if (!this.vault) return

    Vue.set(this.vault, 'activeWallet', address)
  }

  @Mutation
  commitVaultWalletAdd (wallet: MinterWallet) {
    if (!this.vault) { return }

    Vue.set(this.vault.wallets, wallet.address, wallet)
  }

  @Mutation
  commitVaultWalletDelete (address: string) {
    if (!this.vault) { return }

    Vue.delete(this.vault.wallets, address)
  }

  @Mutation
  commitVaultWalletLabel (label: string) {
    if (!this.vault) { return }

    Vue.set(this.vault.wallets[this.vault.activeWallet].meta, 'label', label)
  }

  @Mutation
  commitVaultWalletColor (color: string) {
    if (!this.vault) { return }

    Vue.set(this.vault.wallets[this.vault.activeWallet].meta, 'color', color)
  }

  @Mutation
  commitVaultWalletTxs (data: { address: string; txs: MinterWalletTxs }) {
    if (!this.vault) { return }

    Vue.set(this.vault.wallets[data.address], 'txs', data.txs)
  }

  @Mutation
  commitVaultWalletBalance (data: { address: string; balances: MinterWalletBalance[] }) {
    if (!this.vault) { return }

    Vue.set(this.vault.wallets[data.address], 'balances', data.balances)
  }
}
