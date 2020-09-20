import Vue from 'vue'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { VaultWallets, Vault, VaultConnectedWebsites } from '@/model/Vault'
import { MinterWallet, MinterWalletBalance, MinterWalletTxs } from '@/model/Wallet'

const VAULT: Vault = {
  activeWallet: '',
  wallets: {},
  connectedWebsites: {}
}

@Module({ namespaced: true, name: 'state' })
export default class StateStore extends VuexModule {
  loggedIn = false
  expiry = 0
  vaultExist = false
  vault = VAULT

  /**
   * Is Vault Empty
   */
  get empty (): boolean {
    return !Object.keys(this.vault.wallets).length
  }

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
  commitVault (vault: Vault) {
    Vue.set(this, 'vault', vault)
  }

  @Mutation
  commitVaultReset () {
    this.vault = VAULT
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
  commitVaultWalletIcon (icon: string) {
    if (!this.vault) { return }

    Vue.set(this.vault.wallets[this.vault.activeWallet].meta, 'icon', icon)
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

  @Mutation
  commitVaultConnectedWebsites (connectedWebsites: VaultConnectedWebsites) {
    if (!this.vault) { return }

    Vue.set(this.vault, 'connectedWebsites', connectedWebsites)
  }
}
