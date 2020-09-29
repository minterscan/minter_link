import crypto from '@/services/Crypto'
import settings from '@/services/Settings'

export enum ObservableProps {
  Key = 'key',
  Expiry = 'expiry',
}

export type Observers = {
  [ObservableProps.Key]: Function[];
  [ObservableProps.Expiry]: Function[];
}

// Keyring controller
export class KeyringService {
  private _key = ''
  private _expiry = 0
  private _destroyTimeout!: NodeJS.Timeout
  private _observers: Observers = {
    key: [],
    expiry: []
  }

  /**
   * Get key expiration timestamp
   */
  get expiry (): number {
    return this._expiry
  }

  /**
   * Get key status
   *
   * true = alive
   * false = expired
   */
  get expired (): boolean {
    return (!this.expiry || Date.now() > this.expiry)
  }

  /**
   * Get encrypted key & update expire
   */
  get key (): string {
    if (!this.expired) {
      this.touch()
    }

    return this._key
  }

  /**
   * Set encripted key
   *
   * @param value
   */
  private setKey (value: string) {
    const oldValue = this._key

    this._key = value

    if (oldValue !== value) this.notifySubscribers(ObservableProps.Key, value)
  }

  /**
   * Set expiry
   *
   * @param value
   */
  private setExpiry (value: number) {
    const oldValue = this._expiry

    this._expiry = value

    if (oldValue !== value) this.notifySubscribers(ObservableProps.Expiry, value)
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
  private attach (password: string): void {
    this.setKey(crypto.encryptSHA3(password))
  }

  /**
   * Update key expiration
   */
  private touch (): void {
    this.setExpiry(Date.now() + settings.autoLock)

    global.clearTimeout(this._destroyTimeout)
    this._destroyTimeout = global.setTimeout(this.destroy.bind(this), settings.autoLock)
  }

  /**
   * Delete key & reset key expiration
   */
  destroy (): void {
    this.setKey('')
    this.setExpiry(0)
    global.clearTimeout(this._destroyTimeout)
  }

  /**
   * Subscribe observers
   *
   * @param property
   * @param callback
   */
  subscribe (property: ObservableProps, callback: Function): void {
    this._observers[property].push(callback)
  }

  /**
   * Notify observers about Minter Link updates
   *
   * @param property
   * @param value
   */
  private notifySubscribers (property: ObservableProps, value: number|string): void {
    for (let i = 0; i < this._observers[property].length; i++) {
      this._observers[property][i](value)
    }
  }
}

export default new KeyringService()
