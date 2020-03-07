<template>
  <a-layout :class="['route', $route.name]">
    <loading v-if="ui.loading" />
    <navbar />
    <router-view />
    <expand-button />
  </a-layout>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { Vault } from '@/model/Vault'
import { ERouter } from '@/model/Router'
import { LetterSubject } from './model/Letter'
import Loading from '@/components/common/Loading.vue'
import Navbar from '@/components/common/navbar/Navbar.vue'
import ExpandButton from '@/components/common/ExpandButton.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'

@Component({
  name: 'App',
  components: { ExpandButton, Loading, Navbar }
})
export default class App extends Mixins(Base) {
  @Watch('state.vault')
  async onVaultChange (value: Vault | null) {
    if (!value) {
      return this.navigate(ERouter.Home)
    }
  }

  @Watch('state.loggedIn', { immediate: true })
  async onAuthChange (value: boolean) {
    await this.postman.sendToTab({
      subject: LetterSubject.GetVaultStatus,
      body: value
    })

    if (!value) {
      return this.state.commitVault(null)
    }

    const vault = await this.postman.getVaultPublicData()
    const addressBook = await this.postman.getAddressBookPublicData()

    this.state.commitVault(vault)
    this.addressBook.commitBook(addressBook)
  }

  @Watch('ui.error')
  async onErrorChange (value: Error | null) {
    if (value) {
      await this.$message.error(value.message)
    }
  }

  mounted (): void {
    document.body.addEventListener('click', () => {
      if (!this.state.expiry || Date.now() > this.state.expiry) this.state.commitLoggedIn(false)
    })
  }
}
</script>
