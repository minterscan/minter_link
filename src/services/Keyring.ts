import store from '@/background/store'
import crypto from '@/services/Crypto'

// Default key expiration is 1 hour
const PASSWORD_LIFETIME = 60 * 60 * 1000

// Keyring controller
export class KeyringService {
  /**
   * Get key status
   *
   * true = alive
   * false = expired
   */
  get expired (): boolean {
    return (!store.expiry || Date.now() > store.expiry)
  }

  /**
   * Get decrypted key
   */
  get key (): string {
    if (this.expired) {
      this.destroy()
    } else {
      this.touch()
    }

    return store.password
  }

  /**
   * Get key expiration timestamp
   */
  get expiry (): number {
    return store.expiry
  }

  /**
   * Create Keyring. Add key to it & set key expiration
   *
   * @param password
   */
  create (password: string): number {
    this.touch()
    this.attach(password)

    return this.expiry
  }

  /**
   * Attach key to Keyring
   *
   * @param password
   */
  attach (password: string): void {
    store.password = crypto.encryptSHA3(password)
  }

  /**
   * Update key expiration
   */
  touch (): void {
    store.expiry = Date.now() + PASSWORD_LIFETIME
  }

  /**
   * Delete key & reset key expiration
   */
  destroy (): void {
    store.password = ''
    store.expiry = 0
  }
}

export default new KeyringService()
