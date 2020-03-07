import { APP_PORT } from '@/model/App'
import pckg from './../../package.json'
import postman from '@/services/Postman'
import { MinterLinkEvent } from 'minter-connect'
import { browser } from 'webextension-polyfill-ts'
import { LetterSubject, Letter } from '@/model/Letter'

export default class ContentScript {
  constructor () {
    this.subscribe()
  }

  /**
   * Subscribe on events
   */
  subscribe () {
    // Wait for tab activation before init
    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState) {
        await this.init()
      }
    })

    // Listen for Payment request from tab
    document.addEventListener(MinterLinkEvent.PaymentRequest, this.handlePaymentRequest)

    // Listen for Postman messages on browser port open
    browser.runtime.onConnect.addListener(port => {
      if (port.name === APP_PORT) {
        port.onMessage.addListener(async (message: Letter) => {
          if (message.subject === LetterSubject.GetVaultStatus) {
            await this.dispatchIsUnlocked()
          }

          if (message.subject === LetterSubject.PaymentReject) {
            return this.dispatchPaymentReject()
          }

          if (message.subject === LetterSubject.PaymentAccept) {
            return this.dispatchPaymentAccept()
          }
        })
      }
    })
  }

  /**
   * Send initial data to tab
   */
  async init () {
    this.dispatchVersion()
    this.dispatchIsInstalled()
    await this.dispatchIsUnlocked()
  }

  /**
   * Send extension version
   */
  dispatchVersion (): void {
    const event = new CustomEvent(MinterLinkEvent.Version, { detail: pckg.version })

    document.dispatchEvent(event)
  }

  /**
   * Send is extension installed
   */
  dispatchIsInstalled (): void {
    const event = new CustomEvent(MinterLinkEvent.IsInstalled, { detail: true })

    document.dispatchEvent(event)
  }

  /**
   * Send extension status
   */
  async dispatchIsUnlocked (): Promise<void> {
    const message = await postman.getVaultStatus()
    const event = new CustomEvent(MinterLinkEvent.IsUnlocked, { detail: message })

    document.dispatchEvent(event)
  }

  /**
   * Dispatch Payment rejected event to tab
   */
  async dispatchPaymentReject (): Promise<boolean> {
    const event = new CustomEvent(MinterLinkEvent.PaymentReject)

    document.dispatchEvent(event)

    return false
  }

  /**
   * Dispatch Payment accepted event to tab
   */
  async dispatchPaymentAccept (): Promise<boolean> {
    const event = new CustomEvent(MinterLinkEvent.PaymentAccept)

    document.dispatchEvent(event)

    return true
  }

  /**
   * Dispatch Payment request to Extension background script
   *
   * @param event
   */
  async handlePaymentRequest (event: Event) {
    await postman.paymentRequest((event as CustomEvent).detail)
  }
}
