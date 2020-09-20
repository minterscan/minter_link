import { browser, Runtime } from 'webextension-polyfill-ts'
import { Letter, ContentScriptLetterSubject } from '@/model/Letter'

export default class Channel {
  public readonly port: Runtime.Port

  constructor (domain: string) {
    this.port = browser.runtime.connect(undefined, { name: domain })
  }

  /**
   * Post Message to opened port
   *
   * @param message
   */
  postMessage (message: Letter): void {
    this.port.postMessage(message)
  }

  /**
   * Request Vault status
   */
  requestVaultStatus (): void {
    return this.postMessage({
      subject: ContentScriptLetterSubject.RequestVaultStatus
    })
  }

  /**
   * Request Vault status
   */
  requestActiveWallet (): void {
    return this.postMessage({
      subject: ContentScriptLetterSubject.RequestVaultActiveWallet
    })
  }
}
