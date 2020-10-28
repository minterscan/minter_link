import RootStore from '@/store'
import NetworkStore from '@/store/network'
import { getModule } from 'vuex-module-decorators'

/* eslint-disable @typescript-eslint/camelcase */

let network: NetworkStore

beforeEach(() => {
  network = getModule(NetworkStore, RootStore)
})

it('get status', () => {
  expect(network.status.avg_block_time).toEqual(0)
})

it('set status', () => {
  network.commitStatus({
    avg_block_time: 0,
    bip_price_change: 0,
    bip_price_usd: 0,
    latest_block_height: 0,
    latest_block_time: '0',
    market_cap: 0,
    total_transactions: 0,
    transactions_per_second: 0
  })

  expect(network.status.bip_price_usd).toEqual(0)
})
