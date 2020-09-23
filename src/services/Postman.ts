import { browser } from 'webextension-polyfill-ts'
import { Letter, LetterSubject } from '@/model/Letter'
import { ConnectRequest, SignRequest, PaymentRequest } from 'minter-connect'
import { Vault, VaultConnectedWebsites, DeleteConnectedWebsiteRequest } from '@/model/Vault'
import {
  MinterWalletAddRequest,
  MinterWalletBalance,
  MinterWalletDelegations,
  MinterWalletMeta,
  MinterWalletTxs
} from '@/model/Wallet'
import {
  TxBuyRequest,
  TxDelegateRequest,
  TxSellAllRequest,
  TxSellRequest,
  TxSendRequest,
  TxUnbondRequest
} from '@/model/Tx'
import { AxiosResponse } from 'axios'
import { Coin } from '@/model/Coin'
import { Validator } from '@/model/Validator'
import { ExplorerAddressTxsRequest } from '@/model/Explorer'
import { AddressBook, AddressBookItem } from '@/model/AddressBook'
import { EstimateResponse, EstimateBuyRequest, EstimateSellRequest } from '@/model/Estimate'
import { Settings } from '@/model/Settings'

/**
 * Main data bus service between extensions, background and content scripts
 */
export class PostmanService {
  /**
   * Send message to background script
   *
   * @param message
   */
  async send<T> (message: Letter): Promise<T> {
    return browser.runtime.sendMessage(message)
  }

  /**
   * Send message to content script
   *
   * @param message
   * @param tabId
   */
  async sendToTab<T> (message: Letter, tabId = 0): Promise<void> {
    try {
      if (!tabId) {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true })

        if (!tabs[0].id || !tabs[0].url) return

        tabId = tabs[0].id
      }

      browser.tabs.sendMessage(tabId, message)
    } catch (e) {
      // Do nothing
    }
  }

  /**
   * Create empty Vault or import from string
   *
   * @param body
   */
  async createVault (body = ''): Promise<void> {
    return this.send({
      subject: LetterSubject.CmdVaultCreate,
      body
    })
  }

  /**
   * Get encoded Vault string
   */
  async getVaultEncoded (): Promise<string> {
    return this.send({
      subject: LetterSubject.GetVaultEncoded
    })
  }

  /**
   * Get Vault public data
   */
  async getVaultPublicData (): Promise<Vault> {
    return this.send({
      subject: LetterSubject.GetVaultPublicData
    })
  }

  /**
   * Check is Vault exist
   */
  async getVaultExist (): Promise<boolean> {
    return this.send({
      subject: LetterSubject.GetVaultExist
    })
  }

  /**
   * Try to unlock Vault with provided password
   *
   * @param body
   */
  async vaultPing (body: string): Promise<string> {
    return this.send({
      subject: LetterSubject.CmdVaultPing,
      body
    })
  }

  /**
   * Delete Vault
   */
  async vaultDelete () {
    return this.send({
      subject: LetterSubject.CmdVaultDelete
    })
  }

  /**
   * Try to unlock Vault and return wallet seed
   *
   * @param body
   */
  async getWalletSeed (body: { password: string; address: string }): Promise<string> {
    return this.send({
      subject: LetterSubject.GetWalletSeed,
      body
    })
  }

  /**
   * Get Vault status
   */
  async getVaultStatus (): Promise<boolean> {
    return this.send({
      subject: LetterSubject.GetVaultStatus
    })
  }

  /**
   * Generate new Wallet & add to Vault
   *
   * @param body
   */
  async newWallet (body: MinterWalletMeta): Promise<Vault> {
    return this.send({
      subject: LetterSubject.CmdWalletCreate,
      body
    })
  }

  /**
   * Import Wallet from seed & add to Vault
   *
   * @param body
   */
  async importWallet (body: MinterWalletAddRequest): Promise<Vault> {
    return this.send({
      subject: LetterSubject.CmdWalletImport,
      body
    })
  }

  /**
   * Delete active Wallet from Vault
   */
  async deleteWallet (): Promise<string> {
    return this.send({
      subject: LetterSubject.CmdWalletDelete
    })
  }

  /**
   * Get Wallet balance
   *
   * @param body
   */
  async getAddressBalances (body: string): Promise<MinterWalletBalance[]> {
    return this.send({
      subject: LetterSubject.GetWalletBalances,
      body
    })
  }

  /**
   * Get Wallet Transactions list
   *
   * @param body
   */
  async getAddressTxs (body: ExplorerAddressTxsRequest): Promise<MinterWalletTxs> {
    return this.send({
      subject: LetterSubject.GetWalletTxs,
      body
    })
  }

  /**
   * Get Wallet Delegations list
   *
   * @param body
   */
  async getAddressDelegations (body: string): Promise<MinterWalletDelegations> {
    return this.send({
      subject: LetterSubject.GetWalletDelegations,
      body
    })
  }

  /**
   * Get Network validators list
   */
  async getValidators (): Promise<Validator[]> {
    return this.send({
      subject: LetterSubject.GetValidators
    })
  }

  /**
   * Get Network coins list
   */
  async getCoins (): Promise<Coin[]> {
    return this.send({
      subject: LetterSubject.GetCoins
    })
  }

  /**
   * Get Password expiration
   */
  async getPasswordExpiry (): Promise<number> {
    return this.send({
      subject: LetterSubject.GetPasswordExpiry
    })
  }

  /**
   * Set password to Keyring
   *
   * @param body
   */
  async setPassword (body: string): Promise<number> {
    return this.send({
      subject: LetterSubject.SetPassword,
      body
    })
  }

  /**
   * Delete password from Keyring
   */
  async deletePassword (): Promise<void> {
    const message = { subject: LetterSubject.DeletePassword }

    // await this.sendToTab(message)
    return this.send(message)
  }

  /**
   * Set active Wallet
   *
   * @param body
   */
  async setVaultActiveWallet (body: string): Promise<Vault> {
    return this.send({
      subject: LetterSubject.SetVaultActiveWallet,
      body
    })
  }

  /**
   * Get active Wallet
   *
   * @param body
   */
  async getVaultActiveWallet (): Promise<string> {
    return this.send({
      subject: LetterSubject.GetVaultActiveWallet
    })
  }

  /**
   * Set active Wallet Meta
   *
   * @param body
   */
  async setVaultWalletMeta (body: { address: string; meta: MinterWalletMeta }): Promise<Vault> {
    return this.send({
      subject: LetterSubject.SetVaultActiveWalletMeta,
      body
    })
  }

  /**
   * SEND transaction
   *
   * @param body
   */
  async txSend (body: TxSendRequest): Promise<AxiosResponse> {
    return this.send({
      subject: LetterSubject.TxSend,
      body
    })
  }

  /**
   * BUY transaction
   *
   * @param body
   */
  async txBuy (body: TxBuyRequest): Promise<AxiosResponse> {
    return this.send({
      subject: LetterSubject.TxBuy,
      body
    })
  }

  /**
   * SELL transaction
   *
   * @param body
   */
  async txSell (body: TxSellRequest): Promise<AxiosResponse> {
    return this.send({
      subject: LetterSubject.TxSell,
      body
    })
  }

  /**
   * SELL ALL transaction
   *
   * @param body
   */
  async txSellAll (body: TxSellAllRequest): Promise<AxiosResponse> {
    return this.send({
      subject: LetterSubject.TxSellAll,
      body
    })
  }

  /**
   * DELEGATE transaction
   *
   * @param body
   */
  async txDelegate (body: TxDelegateRequest): Promise<AxiosResponse> {
    return this.send({
      subject: LetterSubject.TxDelegate,
      body
    })
  }

  /**
   * UNBOND transaction
   *
   * @param body
   */
  async txUnbond (body: TxUnbondRequest): Promise<AxiosResponse> {
    return this.send({
      subject: LetterSubject.TxUnbond,
      body
    })
  }

  /**
   * Get decrypted Address Book
   */
  async getAddressBookPublicData (): Promise<AddressBook> {
    return this.send({
      subject: LetterSubject.GetAddressBookPublicData
    })
  }

  /**
   * Add Item to Address Book
   *
   * @param body
   */
  async addressBookItemAdd (body: AddressBookItem): Promise<AddressBookItem> {
    return this.send({
      subject: LetterSubject.CmdAddressBookItemAdd,
      body
    })
  }

  /**
   * Delete Item from Address Book
   *
   * @param body
   */
  async addressBookItemDelete (body: string): Promise<AddressBook> {
    return this.send({
      subject: LetterSubject.CmdAddressBookItemDelete,
      body
    })
  }

  /**
   * BUY transaction Estimate
   *
   * @param body
   */
  async estimateBuy (body: EstimateBuyRequest): Promise<EstimateResponse> {
    return this.send({
      subject: LetterSubject.EstimateBuy,
      body
    })
  }

  /**
   * SELL transaction Estimate
   *
   * @param body
   */
  async estimateSell (body: EstimateSellRequest): Promise<EstimateResponse> {
    return this.send({
      subject: LetterSubject.EstimateSell,
      body
    })
  }

  /**
   * Get Settings Public Data
   *
   * @param body
   */

  async getSettingsPublicData (): Promise<Settings> {
    return this.send({
      subject: LetterSubject.GetSettingsPublicData
    })
  }

  /**
   * Set Auto Lock
   *
   * @param body
   */
  async setSettingsAutoLock (body: number): Promise<number> {
    return this.send({
      subject: LetterSubject.SetSettingsAutoLock,
      body
    })
  }

  /**
   * Connect Request
   *
   * @param body
   */
  async connectRequest (body: ConnectRequest): Promise<void> {
    return this.send({
      subject: LetterSubject.ConnectRequest,
      body
    })
  }

  /**
   * Reject Connect Request
   *
   * @param tabId
   */
  async connectReject (tabId: number): Promise<void> {
    return this.sendToTab({
      subject: LetterSubject.ConnectReject
    }, tabId)
  }

  /**
   * Accept Connect Request
   *
   * @param tabId
   */
  async connectAccept (body: string, tabId: number): Promise<void> {
    return this.sendToTab({
      subject: LetterSubject.ConnectAccept,
      body
    }, tabId)
  }

  /**
   * Auth Request
   *
   * @param body
   */
  async signRequest (body: SignRequest): Promise<void> {
    return this.send({
      subject: LetterSubject.SignRequest,
      body
    })
  }

  /**
   * Auth Payment Request
   *
   * @param tabId
   */
  async signReject (tabId: number): Promise<void> {
    return this.sendToTab({
      subject: LetterSubject.SignReject
    }, tabId)
  }

  /**
   * Auth Payment Request
   *
   * @param message
   * @param tabId
   */
  async signAccept (message: string, tabId: number): Promise<void> {
    return this.sendToTab({
      subject: LetterSubject.SignAccept,
      body: message
    }, tabId)
  }

  /**
   * Sign message
   *
   * @param body
   */
  async sign (body: string): Promise<string> {
    return this.send({
      subject: LetterSubject.CmdSign,
      body
    })
  }

  /**
   * Add connected website to Vault
   *
   * @param body
   */
  async addConnectedWebsite (body: string): Promise<VaultConnectedWebsites> {
    return this.send({
      subject: LetterSubject.CmdConnectedWebsitesAdd,
      body
    })
  }

  /**
   * Delete connected website from Vault
   *
   * @param body
   */
  async deleteConnectedWebsite (body: DeleteConnectedWebsiteRequest): Promise<VaultConnectedWebsites> {
    return this.send({
      subject: LetterSubject.CmdConnectedWebsitesDelete,
      body
    })
  }

  /**
   * Payment Request
   *
   * @param body
   */
  async paymentRequest (body: PaymentRequest): Promise<void> {
    return this.send({
      subject: LetterSubject.PaymentRequest,
      body
    })
  }

  /**
   * Reject Payment Request
   *
   * @param tabId
   */
  async paymentReject (tabId: number): Promise<void> {
    return this.sendToTab({
      subject: LetterSubject.PaymentReject
    }, tabId)
  }

  /**
   * Accept Payment Request
   *
   * @param body
   * @param tabId
   */
  async paymentAccept (body: string, tabId: number): Promise<void> {
    return this.sendToTab({
      subject: LetterSubject.PaymentAccept,
      body
    }, tabId)
  }
}

export default PostmanService
