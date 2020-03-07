import { browser, Runtime } from 'webextension-polyfill-ts'
import PropertyLastErrorType = Runtime.PropertyLastErrorType

/**
 * Browser Local Storage Service
 */
class StorageService {
  /**
   * Get value by key
   *
   * @param key
   */
  async get (key: string): Promise<string> {
    const result = await browser.storage.local.get(key)

    if (!this.isEmpty(result)) {
      return result[key]
    }

    return ''
  }

  /**
   * Set value by key
   *
   * @param obj
   */
  async set (obj: object): Promise<boolean> {
    await browser.storage.local.set(obj)

    const err = this.checkForError()

    if (!err) {
      return true
    } else {
      throw new Error('Can not save data to storage')
    }
  }

  /**
   * Clear storage
   */
  async clear (): Promise<boolean> {
    await browser.storage.local.clear()

    const err = this.checkForError()

    if (!err) {
      return true
    } else {
      throw new Error('Can not clear storage')
    }
  }

  /**
   * Check last browser runtime error
   */
  checkForError (): void | PropertyLastErrorType {
    const lastError = browser.runtime.lastError

    if (!lastError) { return }

    if (lastError.message) {
      return lastError
    }

    return new Error(lastError.message)
  }

  /**
   * Check is Storage empty
   *
   * @param obj
   */
  isEmpty (obj: object): boolean {
    return Object.keys(obj).length === 0
  }
}

export default new StorageService()
