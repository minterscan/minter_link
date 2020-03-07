import { UIWalletData } from '@/model/Wallet'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'ui' })
export default class UI extends VuexModule {
  loading = true
  error: Error | null = null
  walletTab: UIWalletData = UIWalletData.Transactions

  @Mutation
  commitLoading (payload: boolean) {
    this.loading = payload
  }

  @Mutation
  commitError (payload: string | null) {
    if (payload) {
      this.error = new Error(payload)
    } else {
      this.error = null
    }
  }

  @Mutation
  commitWalletTab (payload: UIWalletData) {
    this.walletTab = payload
  }
}
