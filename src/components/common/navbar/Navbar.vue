<template>
  <a-layout-header class="header" v-if="visible">
    <div class="start">
      <!-- Logo -->
      <router-link to="/vault" v-if="state.vault"><logo /></router-link>
      <router-link to="/" v-else><logo :showText="true" /></router-link>
    </div>

    <!-- Wallets -->
    <div class="center">
      <wallets-switcher />
      <address-book-title />
    </div>

    <!-- Buttons -->
    <div class="end">
      <template v-if="state.loggedIn">
        <a-button shape="circle" icon="user" size="large" @click="toggleVaultMenu()" />
      </template>
    </div>

    <!-- Menu -->
    <vault-menu :visible="vaultMenuVisible" :close="toggleVaultMenu" />
  </a-layout-header>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { ERouter } from '@/model/Router'
import Logo from '@/components/common/Logo.vue'
import { Component, Mixins } from 'vue-property-decorator'
import VaultMenu from '@/components/common/navbar/Menu.vue'
import WalletsSwitcher from '@/components/common/navbar/WalletsSwitcher.vue'
import AddressBookTitle from '@/components/address-book/AddressBookTitle.vue'

@Component({
  name: 'Navbar',
  components: { AddressBookTitle, Logo, VaultMenu, WalletsSwitcher }
})
export default class Navbar extends Mixins(Base) {
  vaultMenuVisible = false

  get visible (): boolean {
    return this.$route.path !== ERouter.Home
  }

  toggleVaultMenu () {
    this.vaultMenuVisible = !this.vaultMenuVisible
  }
}
</script>
