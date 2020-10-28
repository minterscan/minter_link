import { NetworkStatus } from '@/model/Network'
import { TxCoin } from '@/model/Tx'
import { Validator } from '@/model/Validator'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

/* eslint-disable @typescript-eslint/camelcase */

const STATUS: NetworkStatus = {
  avg_block_time: 0,
  bip_price_change: 0,
  bip_price_usd: 0,
  latest_block_height: 0,
  latest_block_time: '0',
  market_cap: 0,
  total_transactions: 0,
  transactions_per_second: 0
}

@Module({ namespaced: true, name: 'network' })
export default class NetworkStore extends VuexModule {
  status = STATUS
  coins: TxCoin[] = []
  validators: Validator[] = []

  @Mutation
  commitStatus (payload: NetworkStatus) {
    this.status = payload
  }

  @Mutation
  commitCoins (payload: TxCoin[]) {
    this.coins = payload
  }

  @Mutation
  commitValidators (payload: Validator[]) {
    this.validators = payload
  }
}
