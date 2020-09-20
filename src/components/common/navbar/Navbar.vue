<template>
  <a-layout-header class="header" v-if="visible">
    <div class="start">
      <!-- Logo -->
      <logo @click.native="openMenu()" :simple="true" />
    </div>

    <!-- Wallets -->
    <div class="center">
      <wallets-switcher />
    </div>

    <!-- Buttons -->
    <div class="end">
      <wallet-menu v-if="Object.keys(this.state.vault.wallets).length" />
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { ERouter } from '@/model/Router'
import Logo from '@/components/common/Logo.vue'
import { Component, Mixins } from 'vue-property-decorator'
import WalletMenu from '@/components/wallet/WalletMenu.vue'
import WalletsSwitcher from '@/components/common/navbar/WalletsSwitcher.vue'

@Component({
  name: 'Navbar',
  components: { Logo, WalletMenu, WalletsSwitcher }
})
export default class Navbar extends Mixins(Base) {
  vaultMenuVisible = false

  get visible (): boolean {
    return this.$route.path !== ERouter.Home
  }

  openMenu (): void {
    if (!this.state.loggedIn) return

    this.ui.commitMenuVisible(true)
  }
}
</script>
