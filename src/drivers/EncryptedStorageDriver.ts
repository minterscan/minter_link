import crypto from '@/services/Crypto'
import { Ledger } from '@/model/Ledger'
import storage from '@/services/Storage'
import keyring, { KeyringService } from '@/services/Keyring'

/**
 * Encrypted Storage Driver
 */
export class EncryptedStorageDriver {
  protected readonly id = 'ledger'
  protected readonly keyring: KeyringService = keyring
  protected readonly initialState: Ledger = {
    addressBook: {},
    vault: {
      activeWallet: '',
      wallets: {}
    }
  }

  /**
   * Get encrypted Storage string
   */
  async get (): Promise<string> {
    return storage.get(this.id)
  }

  /**
   * Set encrypted string to Storage
   *
   * @param data
   */
  async set (data: string): Promise<boolean> {
    return storage.set({
      [this.id]: data
    })
  }

  /**
   * Create empty Storage or import from string
   *
   * @param encryptedString
   */
  async create (encryptedString = ''): Promise<boolean> {
    try {
      if (!encryptedString) {
        const message = JSON.stringify(this.initialState)
        encryptedString = crypto.encryptAES(message, this.keyring.key).toString()
      }
      return this.set(encryptedString)
    } catch (e) {
      throw new Error('Can not save data')
    }
  }

  /**
   * Check is Storage exist
   */
  async exist (): Promise<boolean> {
    const vault = await storage.get(this.id)

    return !!vault
  }

  /**
   * Open encrypted storage with Keyring
   */
  async open (): Promise<Ledger> {
    const message = await this.get()
    const decryptedData = crypto.decryptAES(message, this.keyring.key)

    return JSON.parse(decryptedData)
  }

  /**
   * Try to open encrypted Storage with provided key
   *
   * @param password
   */
  async ping (password: string): Promise<void> {
    try {
      const message = await storage.get(this.id)
      crypto.decryptAES(message, crypto.encryptSHA3(password))
    } catch (e) {
      throw new Error('Wrong password')
    }
  }

  /**
   * Destroy Storage
   */
  async destroy (): Promise<void> {
    try {
      await storage.clear()
    } catch (e) {
      throw new Error('Can not destroy vault')
    }
  }
}
