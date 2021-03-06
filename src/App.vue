<template>
  <a-layout :class="['route', $route.name]">
    <!-- Navbar -->
    <navbar v-if="type === 'app'" />

    <!-- Content -->
    <router-view />

    <!-- Global loading overlay -->
    <loading v-if="ui.loading" />

    <!-- Open in new tab button -->
    <expand-button />

    <!-- Main menu -->
    <vault-menu />
  </a-layout>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import Error from '@/mixins/Error'
import { ERouter } from '@/model/Router'
import Loading from '@/components/common/Loading.vue'
import Navbar from '@/components/common/navbar/Navbar.vue'
import VaultMenu from '@/components/common/navbar/Menu.vue'
import ExpandButton from '@/components/common/ExpandButton.vue'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'App',
  components: { ExpandButton, Loading, Navbar, VaultMenu }
})
export default class App extends Mixins(Base, Error) {
  @Prop({ default: 'app' }) type!: string

  @Watch('state.loggedIn')
  async onAuthChange (value: boolean) {
    if (!value) {
      this.state.commitVaultReset()

      return this.navigate(ERouter.Home)
    }

    this.fetchNetworkCoins()
    this.fetchNetworkStatus()
    this.fetchNetworkValidators()
    this.state.commitVault(await this.postman.getVaultPublicData())
    this.settings.commitSettings(await this.postman.getSettingsPublicData())
    this.addressBook.commitBook(await this.postman.getAddressBookPublicData())
  }

  mounted (): void {
    this.ui.commitLoading(true)
  }

  async fetchNetworkStatus (): Promise<void> {
    try {
      const status = await this.postman.getNetworkStatus()

      this.network.commitStatus(status)
    } catch (e) {
      this.ui.commitError(e)
    }
  }

  async fetchNetworkCoins () {
    try {
      const coins = await this.postman.getNetworkCoins()

      this.network.commitCoins(coins.map((item) => {
        return {
          id: item.id,
          symbol: item.symbol
        }
      }))
    } catch (e) {
      this.ui.commitError(e)
    }
  }

  async fetchNetworkValidators () {
    try {
      const validators = await this.postman.getValidators()

      this.network.commitValidators(validators.sort((a, b) => +a.stake > +b.stake ? -1 : 1))
    } catch (e) {
      this.ui.commitError(e)
    }
  }
}
</script>
