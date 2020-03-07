import crypto from '@/services/Crypto'
import { Vault, VaultWallets } from '@/model/Vault'
import { MinterWallet, MinterWalletMeta } from '@/model/Wallet'
import { EncryptedStorageDriver } from '@/drivers/EncryptedStorageDriver'

/**
 * Encrypted Vault Driver
 */
export class VaultDriver extends EncryptedStorageDriver {
  /**
   * Get Vault public data:
   * 
   * - wallets[]
   * -- address
   * -- meta
   * - activeWallet
   */
  async getPublicData (): Promise<Vault> {
    const publicWallets: VaultWallets = {}
    const { vault } = await this.open()

    Object.keys(vault.wallets).map((address) => {
      publicWallets[address] = {
        address: vault.wallets[address].address,
        meta: vault.wallets[address].meta
      }
    })

    return {
      activeWallet: vault.activeWallet,
      wallets: publicWallets
    }
  }

  /**
   * Get active Wallet address
   */
  async getActiveWalletAddress (): Promise<string> {
    const { vault } = await this.open()
    const wallet = vault.wallets[vault.activeWallet]

    return wallet ? wallet.address : ''
  }

  /**
   * Get active Wallet seed
   */
  async getActiveWalletSeed (): Promise<string> {
    const { vault } = await this.open()
    const wallet = vault.wallets[vault.activeWallet]

    return (wallet && wallet.seed) ? wallet.seed : ''
  }

  /**
   * Add wallet to Vault 
   * 
   * @param wallet 
   */
  async addWallet (wallet: MinterWallet): Promise<number> {
    const ledger = await this.open()

    ledger.vault.wallets[wallet.address] = wallet

    const encryptedData = crypto.encryptAES(JSON.stringify(ledger), this.keyring.key)

    await this.set(encryptedData.toString())

    return Object.keys(ledger.vault.wallets).length
  }

  /**
   * Set active Wallet
   * 
   * @param address 
   */
  async setActiveWallet (address: string): Promise<void> {
    const ledger = await this.open()

    ledger.vault.activeWallet = address

    const encryptedData = crypto.encryptAES(JSON.stringify(ledger), this.keyring.key)

    await this.set(encryptedData.toString())
  }

  /**
   * Set active Wallet Meta
   * 
   * @param data 
   */
  async setActiveWalletMeta (data: MinterWalletMeta): Promise<void> {
    const ledger = await this.open()

    ledger.vault.wallets[ledger.vault.activeWallet].meta = data

    const encryptedData = crypto.encryptAES(JSON.stringify(ledger), this.keyring.key)

    await this.set(encryptedData.toString())
  }

  /**
   * Delete active Wallet from Vault
   */
  async deleteWallet (): Promise<string> {
    const ledger = await this.open()

    delete ledger.vault.wallets[ledger.vault.activeWallet]

    const keys = Object.keys(ledger.vault.wallets)
    const encryptedData = crypto.encryptAES(JSON.stringify(ledger), this.keyring.key)

    await this.set(encryptedData.toString())

    return keys.length > 0 ? keys[0] : ''
  }
}

export default new VaultDriver()
