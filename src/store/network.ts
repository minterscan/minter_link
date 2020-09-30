import { NetworkStatus } from '@/model/Network'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

const STATUS = {
  averageBlockTime: 0,
  bipPriceChange: 0,
  bipPriceUsd: 0,
  latestBlockHeight: 0,
  latestBlockTime: '0',
  marketCap: 0,
  totalTransactions: 0,
  transactionsPerSecond: 0
}

@Module({ namespaced: true, name: 'network' })
export default class NetworkStore extends VuexModule {
  status: NetworkStatus = STATUS

  @Mutation
  commitStatus (payload: NetworkStatus) {
    this.status = payload
  }
}
