import crypto from '@/services/Crypto'
import { MinterWallet, MinterWalletMeta } from '@/model/Wallet'
import { EncryptedStorageDriver } from '@/drivers/EncryptedStorageDriver'
import { Vault, VaultWallets, VaultConnectedWebsites, DeleteConnectedWebsiteRequest } from '@/model/Vault'

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
      wallets: publicWallets,
      connectedWebsites: vault.connectedWebsites
    }
  }

  /**
   * Get active Wallet address
   */
  async getActiveWalletAddress (): Promise<string> {
    try {
      const { vault } = await this.open()

      return vault.activeWallet
    } catch (e) {
      // TODO: refactor this shit
      return ''
    }
  }

  /**
   * Get active Wallet seed
   */
  async getWalletSeed (address = ''): Promise<string> {
    const { vault } = await this.open()
    const wallet = vault.wallets[address || vault.activeWallet]

    return wallet.seed || ''
  }

  /**
   * Get active Wallet seed
   */
  async getActiveWalletSeed (): Promise<string> {
    return this.getWalletSeed()
  }

  /**
   * Get connected websites list
   */
  async getConnectedWebsites (): Promise<VaultConnectedWebsites> {
    try {
      const { vault } = await this.open()

      return vault.connectedWebsites
    } catch (e) {
      return {}
    }
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
  async setActiveWallet (wallet: string): Promise<void> {
    const ledger = await this.open()

    ledger.vault.activeWallet = wallet

    const encryptedData = crypto.encryptAES(JSON.stringify(ledger), this.keyring.key)

    await this.set(encryptedData.toString())
  }

  /**
   * Set active Wallet Meta
   *
   * @param data
   */
  async setActiveWalletMeta (data: { address: string; meta: MinterWalletMeta }): Promise<void> {
    const ledger = await this.open()

    ledger.vault.wallets[data.address].meta = data.meta

    const encryptedData = crypto.encryptAES(JSON.stringify(ledger), this.keyring.key)

    await this.set(encryptedData.toString())
  }

  /**
   * Delete Wallet by address, returns new active Wallet
   *
   * @param {string} address
   * @returns {string}
   */
  async deleteWallet (address: string): Promise<string> {
    const ledger = await this.open()

    delete ledger.vault.wallets[address]

    const keys = Object.keys(ledger.vault.wallets)
    const encryptedData = crypto.encryptAES(JSON.stringify(ledger), this.keyring.key)

    await this.set(encryptedData.toString())

    return keys.length > 0 ? keys[0] : ''
  }

  /**
   * Add connected website to Vault
   *
   * @param domain
   */
  async addConnectedWebsite (domain: string): Promise<VaultConnectedWebsites> {
    const ledger = await this.open()

    // If Active Wallet websites is not exist
    if (!(ledger.vault.activeWallet in ledger.vault.connectedWebsites)) {
      ledger.vault.connectedWebsites[ledger.vault.activeWallet] = {}
    }

    ledger.vault.connectedWebsites[ledger.vault.activeWallet][domain] = (new Date()).valueOf()

    const encryptedData = crypto.encryptAES(JSON.stringify(ledger), this.keyring.key)

    await this.set(encryptedData.toString())

    return ledger.vault.connectedWebsites
  }

  /**
   * Delete connected website from Vault
   */
  async deleteConnectedWebsite (request: DeleteConnectedWebsiteRequest): Promise<VaultConnectedWebsites> {
    const ledger = await this.open()

    delete ledger.vault.connectedWebsites[request.address][request.domain]

    const encryptedData = crypto.encryptAES(JSON.stringify(ledger), this.keyring.key)

    await this.set(encryptedData.toString())

    return ledger.vault.connectedWebsites
  }
}

export default new VaultDriver()
