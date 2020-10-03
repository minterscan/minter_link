import RootStore from '@/store'
import UIStore from '@/store/ui'
import { UIWalletData } from '@/model/Wallet'
import { getModule } from 'vuex-module-decorators'

let ui: UIStore

beforeEach(() => {
  ui = getModule(UIStore, RootStore)
})

it('get ui', () => {
  expect(ui.loading).toBeTruthy()
  expect(ui.error).toBeNull()
  expect(ui.menuVisible).toBeFalsy()
  expect(ui.walletTab).toEqual(UIWalletData.Transactions)
})

it('set loading', () => {
  ui.commitLoading(false)

  expect(ui.loading).toBeFalsy()
})

it('set error', () => {
  ui.commitError(new Error('omg'))

  expect(ui.error).toBeInstanceOf(Error)
  expect(ui.error?.message).toEqual('omg')
})

it('set tab', () => {
  ui.commitWalletTab(UIWalletData.Balances)

  expect(ui.walletTab).toEqual(UIWalletData.Balances)
})

it('set menu visible', () => {
  ui.commitMenuVisible(true)

  expect(ui.menuVisible).toBeTruthy()
})
