import RootStore from '@/store'
import StateStore from '@/store/state'
import { getModule } from 'vuex-module-decorators'

/* eslint-disable @typescript-eslint/camelcase */

const state = getModule(StateStore, RootStore)
const VAULT = {
  activeWallet: '',
  wallets: {},
  connectedWebsites: {}
}

it('get state', () => {
  expect(state.loggedIn).toBeFalsy()
  expect(state.expiry).toEqual(0)
  expect(state.vaultExist).toBeFalsy()
  expect(state.vault).toEqual(VAULT)
})

it('get is vault empty', () => {
  expect(state.empty).toBeTruthy()
})

it('get wallets', () => {
  expect(state.wallets).toEqual({})
})

it('get wallet', () => {
  expect(state.wallet).toEqual(undefined)
})

it('get wallet label empty', () => {
  expect(state.walletLabel).toEqual('')
})

it('set logged in', () => {
  state.commitLoggedIn(true)

  expect(state.loggedIn).toBeTruthy()
})

it('set expiry', () => {
  state.commitExpiry(1)

  expect(state.expiry).toEqual(1)
})

it('set expiry', () => {
  state.commitVaultExist(true)

  expect(state.vaultExist).toBeTruthy()
})

it('set vault', () => {
  state.commitVault({
    activeWallet: 'address',
    wallets: {},
    connectedWebsites: {}
  })

  expect(state.vault.activeWallet).toEqual('address')
})

it('reset vault', () => {
  state.commitVaultReset()

  expect(state.vault).toEqual(VAULT)
})

it('set active wallet', () => {
  state.commitVaultActiveWallet('address')

  expect(state.vault.activeWallet).toEqual('address')
})

it('add wallet', () => {
  state.commitVaultWalletAdd({
    address: 'address',
    meta: {
      label: 'label',
      icon: 'icon'
    }
  })

  expect(state.wallets.address.address).toEqual('address')
  expect(state.wallets.address.meta.label).toEqual('label')
  expect(state.wallets.address.meta.icon).toEqual('icon')
})

it('get wallet label filled', () => {
  expect(state.walletLabel).toEqual('label')
})

it('get wallet label fallback', () => {
  state.commitVaultWalletLabel('')

  expect(state.walletLabel).toEqual('address')
})

it('commit wallet label', () => {
  state.commitVaultWalletLabel('new label')

  expect(state.wallet.meta.label).toEqual('new label')
})

it('commit wallet label', () => {
  state.commitVaultWalletIcon('new icon')

  expect(state.wallet.meta.icon).toEqual('new icon')
})

it('commit wallet txs', () => {
  state.commitVaultWalletTxs({
    address: 'address',
    txs: {
      data: [],
      links: {
        first: '',
        last: '',
        prev: '',
        next: ''
      },
      meta: {
        current_page: 1,
        last_page: 2,
        path: '',
        per_page: 10,
        total: 20
      }
    }
  })

  expect(state.wallet.txs?.data).toEqual([])
})

it('set wallet balances', () => {
  state.commitVaultWalletBalance({
    address: 'address',
    balances: [{
      coin: 'BIP',
      amount: '1'
    }]
  })

  expect(state.wallet.balances?.[0].coin).toEqual('BIP')
})

it('set set connected websites', () => {
  const payload = {
    address: {
      domain: 1
    }
  }
  state.commitVaultConnectedWebsites(payload)

  expect(state.vault.connectedWebsites).toEqual(payload)
})

it('delete wallet', () => {
  state.commitVaultWalletDelete('address')

  expect(Object.keys(state.wallets).length).toEqual(0)
})
