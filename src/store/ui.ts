import { UIWalletData } from '@/model/Wallet'
import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'ui' })
export default class UIStore extends VuexModule {
  loading = true
  error: Error | null = null
  menuVisible = false
  walletTab: UIWalletData = UIWalletData.Transactions

  @Mutation
  commitLoading (payload: boolean) {
    this.loading = payload
  }

  @Mutation
  commitError (payload: Error | null) {
    this.error = payload
  }

  @Mutation
  commitWalletTab (payload: UIWalletData) {
    this.walletTab = payload
  }

  @Mutation
  commitMenuVisible (payload: boolean) {
    this.menuVisible = payload
  }
}
