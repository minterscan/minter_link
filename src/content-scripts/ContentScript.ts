import pckg from './../../package.json'
import Channel from '@/services/ChannelService'
import { browser } from 'webextension-polyfill-ts'
import { PostmanService } from '@/services/Postman'
import { Letter, LetterSubject, ContentScriptLetterSubject } from '@/model/Letter'
import { ConnectRequest, Merchant, MinterLinkEvent, PaymentRequest, SignRequest } from 'minter-connect'

export default class ContentScript {
  postman: PostmanService
  channel: Channel | null = null
  status = false
  wallet = ''
  readonly handlers: {
    [key: string]: Function;
  } = {
    [ContentScriptLetterSubject.EventVaultStatusChange]: this.handleStatus.bind(this),
    [ContentScriptLetterSubject.EventVaultActiveWalletChange]: this.handleActiveWallet.bind(this),
    [LetterSubject.ConnectAccept]: this.dispatchConnectAccept.bind(this),
    [LetterSubject.ConnectReject]: this.dispatchConnectReject.bind(this),
    [LetterSubject.PaymentAccept]: this.dispatchPaymentAccept.bind(this),
    [LetterSubject.PaymentReject]: this.dispatchPaymentReject.bind(this),
    [LetterSubject.SignAccept]: this.dispatchSignAccept.bind(this),
    [LetterSubject.SignReject]: this.dispatchSignReject.bind(this)
  }

  constructor () {
    this.postman = new PostmanService()
    this.connect()
  }

  get url (): string {
    const port = location.port ? `:${location.port}` : ''

    return `${location.protocol}//${location.hostname}${port}`
  }

  /**
   * Connect to background port channel
   */
  connect () {
    this.channel = new Channel(this.url)

    this.channel.port.onDisconnect.addListener(this.portReconnect)
  }

  /**
   * Auto reconnect
   */
  portReconnect () {
    // Reset port
    this.channel = null
    // Attempt to reconnect after 1 second
    setTimeout(this.connect, 1000 * 1)
  }

  /**
   * Subscribe on events
   */
  subscribe () {
    if (!this.channel) return

    // Listen for DOM events from tab
    document.addEventListener(MinterLinkEvent.SignRequest, this.handleSignRequest.bind(this))
    document.addEventListener(MinterLinkEvent.ConnectRequest, this.handleConnectRequest.bind(this))
    document.addEventListener(MinterLinkEvent.PaymentRequest, this.handlePaymentRequest.bind(this))

    this.channel.port.onMessage.addListener((letter: Letter) => {
      if (letter.subject === ContentScriptLetterSubject.ResponseVaultStatus) {
        this.status = letter.body
        this.handleStatus(this.status)
      }
      if (letter.subject === ContentScriptLetterSubject.ResponseVaultActiveWallet) {
        this.wallet = letter.body
        this.handleActiveWallet(this.wallet)
      }
    })

    browser.runtime.onMessage.addListener((message: Letter) => {
      try {
        return this.handlers[message.subject](message.body)
      } catch (e) {
        throw new Error(`Unknown message type: ${message.subject}`)
      }
    })

    // Fetch actual data on tab activation
    window.addEventListener('focus', async () => {
      await this.init()
    })

    // Same on window Alt+Tab
    document.addEventListener('visibilitychange', async () => {
      if (document.visibilityState) {
        await this.init()
      }
    })
  }

  /**
   * Prepare request for Minter Link
   * Pass Merchant info & data
   *
   * @param event
   */
  prepareRequest (event: Event): {
    merchant: Merchant;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  } {
    const name = (event as CustomEvent).detail.merchant.name
    const data = (event as CustomEvent).detail.data

    return {
      merchant: {
        name,
        url: this.url
      },
      data
    }
  }

  /**
   * Send initial data to tab
   */
  async init () {
    this.dispatchVersion()
    this.dispatchIsInstalled()
    this.dispatchStatus()
    this.dispatchActiveWallet()
  }

  /**
   * Dispatch extension version to active tab
   */
  dispatchVersion (): void {
    const event = new CustomEvent(MinterLinkEvent.Version, { detail: pckg.version })

    document.dispatchEvent(event)
  }

  /**
   * Dispatch is extension installed to active tab
   */
  dispatchIsInstalled (): void {
    const event = new CustomEvent(MinterLinkEvent.IsInstalled, { detail: true })

    document.dispatchEvent(event)
  }

  /**
   * Send extension status
   */
  dispatchStatus (): void {
    if (this.channel) this.channel.requestVaultStatus()
  }

  /**
   * Send active Wallet to website
   */
  dispatchActiveWallet (): void {
    if (this.channel) this.channel.requestActiveWallet()
  }

  /**
   * Dispatch Connect rejected event to tab
   */
  async dispatchConnectReject (): Promise<boolean> {
    const event = new CustomEvent(MinterLinkEvent.ConnectReject)

    document.dispatchEvent(event)

    return false
  }

  /**
   * Dispatch Connect accepted event to tab
   */
  async dispatchConnectAccept (address: string): Promise<boolean> {
    const event = new CustomEvent(MinterLinkEvent.ConnectAccept, { detail: address })

    document.dispatchEvent(event)

    return true
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
  async dispatchPaymentAccept (hash: string): Promise<boolean> {
    const event = new CustomEvent(MinterLinkEvent.PaymentAccept, { detail: hash })

    document.dispatchEvent(event)

    return true
  }

  /**
   * Dispatch Payment rejected event to tab
   */
  async dispatchSignReject (): Promise<boolean> {
    const event = new CustomEvent(MinterLinkEvent.SignReject)

    document.dispatchEvent(event)

    return false
  }

  /**
   * Dispatch Payment accepted event to tab
   */
  async dispatchSignAccept (signedMessage: string): Promise<boolean> {
    const event = new CustomEvent(MinterLinkEvent.SignAccept, { detail: signedMessage })

    document.dispatchEvent(event)

    return true
  }

  /**
   * Send extension status
   */
  handleStatus (status: boolean): void {
    const event = new CustomEvent(MinterLinkEvent.IsUnlocked, { detail: status })
    document.dispatchEvent(event)
  }

  /**
   * Send active Wallet to website (if website connected)
   */
  handleActiveWallet (wallet: string): void {
    document.dispatchEvent(new CustomEvent(MinterLinkEvent.Wallet, { detail: wallet }))
  }

  /**
   * Dispatch Payment request to background script
   *
   * @param event
   */
  async handlePaymentRequest (event: Event) {
    const request: PaymentRequest = this.prepareRequest(event)

    return this.postman.paymentRequest(request)
  }

  /**
   * Dispatch Connect request to background script
   *
   * @param event
   */
  async handleConnectRequest (event: Event) {
    const request: ConnectRequest = this.prepareRequest(event)

    return this.postman.connectRequest(request)
  }

  /**
   * Dispatch Sign request to background script
   *
   * @param event
   */
  async handleSignRequest (event: Event) {
    const request: SignRequest = this.prepareRequest(event)

    return this.postman.signRequest(request)
  }
}
