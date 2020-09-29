import { NetworkStatus } from '@/model/Network'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'network' })
export default class NetworkStore extends VuexModule {
  status: NetworkStatus | null = null

  @Mutation
  commitStatus (payload: NetworkStatus) {
    this.status = payload
  }
}
