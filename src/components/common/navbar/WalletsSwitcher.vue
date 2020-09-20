<template>
  <div class="cp wallets-switcher" v-if="state.vault && visible">
    <!-- Prev -->
    <div class="arrow prev" v-if="walletsLength > 1" @click="prev()">
      <icon name="arrowLeft" scale="2" />
    </div>

    <!-- Wallet Label -->
    <div class="item">
      <span v-if="state.wallet">{{ state.wallet.meta.icon }}</span>
      {{ state.walletLabel | short(7, 16) }}
    </div>

    <!-- Next -->
    <div class="arrow next" v-if="walletsLength > 1" @click="next()">
      <icon name="arrowRight" scale="2" />
    </div>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import { ERouter } from '@/model/Router'
import { UIWalletData } from '@/model/Wallet'
import Icon from 'vue-awesome/components/Icon.vue'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  name: 'WalletsSwitcher',
  components: { Icon }
})
export default class NavbarWalletsSwitcher extends Mixins(Base) {
  loading = false

  get walletsLength (): number {
    if (!this.state.wallets) return 0

    return Object.keys(this.state.wallets).length
  }

  get visible (): boolean {
    return this.$route.path === ERouter.Vault
  }

  mounted (): void {
    this.listen()
  }

  listen (): void {
    this.$root.$on(AppEvent.FormSubmit, () => {
      this.loading = true
    })

    this.$root.$on(AppEvent.FormReset, () => {
      this.loading = false
    })

    this.$root.$on(AppEvent.FormSuccess, () => {
      this.loading = false
    })
  }

  // TODO: fetch wallets from background storage instead of Vuex
  async prev (): Promise<void> {
    if (this.loading) { return }
    if (!this.state.wallets) { return }
    if (!this.state.vault) { return }

    const keys = Object.keys(this.state.wallets)
    const index = keys.indexOf(this.state.vault.activeWallet)
    const newIndex = (index - 1) < 0 ? keys.length - 1 : index - 1

    await this.postman.setVaultActiveWallet(keys[newIndex])
    this.ui.commitWalletTab(UIWalletData.Transactions)
    this.state.commitVaultActiveWallet(keys[newIndex])
  }

  async next (): Promise<void> {
    if (this.loading) { return }
    if (!this.state.vault) { return }
    if (!this.state.wallets) { return }

    const keys = Object.keys(this.state.wallets)
    const index = keys.indexOf(this.state.vault.activeWallet)
    const newIndex = (index + 1) === keys.length ? 0 : index + 1

    await this.postman.setVaultActiveWallet(keys[newIndex])
    this.ui.commitWalletTab(UIWalletData.Transactions)
    this.state.commitVaultActiveWallet(keys[newIndex])
  }

  destroyed (): void {
    this.$root.$off(AppEvent.FormSubmit)
    this.$root.$off(AppEvent.FormReset)
    this.$root.$off(AppEvent.FormSuccess)
  }
}
</script>
