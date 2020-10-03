import RootStore from '@/store'
import NetworkStore from '@/store/network'
import { getModule } from 'vuex-module-decorators'

let network: NetworkStore

beforeEach(() => {
  network = getModule(NetworkStore, RootStore)
})

it('get status', () => {
  expect(network.status.averageBlockTime).toEqual(0)
})

it('set status', () => {
  network.commitStatus({
    averageBlockTime: 0,
    bipPriceChange: 0,
    bipPriceUsd: 0,
    latestBlockHeight: 0,
    latestBlockTime: '0',
    marketCap: 0,
    totalTransactions: 0,
    transactionsPerSecond: 0
  })

  expect(network.status.bipPriceUsd).toEqual(0)
})
