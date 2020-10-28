import { browser, Runtime } from 'webextension-polyfill-ts'
import { ContentScriptLetterSubject } from '@/model/Letter'

export default class ChannelService {
  public readonly port: Runtime.Port

  constructor (domain: string) {
    this.port = browser.runtime.connect(undefined, { name: domain })
  }

  /**
   * Request Vault status
   */
  requestVaultStatus (): void {
    this.port.postMessage({
      subject: ContentScriptLetterSubject.RequestVaultStatus
    })
  }

  /**
   * Request Vault status
   */
  requestActiveWallet (): void {
    this.port.postMessage({
      subject: ContentScriptLetterSubject.RequestVaultActiveWallet
    })
  }
}
