import crypto from '@/services/Crypto'
import { Ledger } from '@/model/Ledger'
import storage from '@/services/Storage'
import { ApplicationError, ErrorCode } from '@/model/Error'
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
      wallets: {},
      connectedWebsites: {}
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
      throw new ApplicationError(ErrorCode.StorageSave)
    }
  }

  /**
   * Check is Storage exist
   */
  async exist (): Promise<boolean> {
    try {
      const instance = await this.get()

      return !!instance
    } catch (e) {
      return false
    }
  }

  /**
   * Open encrypted Storage with key
   */
  async open (): Promise<Ledger> {
    if (!this.keyring.key) throw new ApplicationError(ErrorCode.Unauthorized)

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
      const message = await this.get()
      crypto.decryptAES(message, crypto.encryptSHA3(password))
    } catch (e) {
      throw new ApplicationError(ErrorCode.PasswordWrong)
    }
  }

  /**
   * Destroy Storage
   */
  async destroy (): Promise<boolean> {
    try {
      return storage.clear()
    } catch (e) {
      throw new ApplicationError(ErrorCode.StorageDestroy)
    }
  }
}
