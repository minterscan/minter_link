<template>
  <a-drawer
    title="Minter Link"
    width="100%"
    @close="close()"
    :visible="visible"
    wrapClassName="cp menu"
  >
    <a-menu mode="inline" :selectable="false">
      <!-- Data section -->
      <a-menu-item @click="newWallet()">
        <a-icon type="plus" />
        New Wallet
      </a-menu-item>
      <a-menu-item @click="importWallet()">
        <a-icon type="download" />
        Import Wallet
      </a-menu-item>
      <a-menu-item @click="openAddressBook()" class="delimiter">
        <a-icon type="team" />
        Contacts
      </a-menu-item>

      <!-- Settings & Logout -->
      <a-menu-item @click="exportAccount()">
        <a-icon type="upload" />
        Export Account
      </a-menu-item>
      <a-menu-item @click="logout()">
        <a-icon type="logout" />
        Logout
      </a-menu-item>
    </a-menu>

    <a-menu mode="inline" :selectable="false">
      <a-menu-item @click="about()">
        <a-icon type="info-circle" />
        About
      </a-menu-item>
      <a-menu-item>
        <a :href="source" target="_blank" title="Source code">
          <a-icon type="github" />
          Version: {{ version }}
        </a>
      </a-menu-item>
    </a-menu>
  </a-drawer>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { ERouter } from '@/model/Router'
import pckg from './../../../../package.json'
import { Component, Mixins, Prop } from 'vue-property-decorator'

@Component
export default class Menu extends Mixins(Base) {
  @Prop() close!: Function
  @Prop({ default: false }) visible!: boolean

  get source (): string {
    return pckg.repository.url
  }

  get version (): string {
    return pckg.version
  }

  newWallet () {
    this.close()
    this.navigate(ERouter.VaultNewWallet)
  }

  importWallet () {
    this.close()
    this.navigate(ERouter.VaultImportWallet)
  }

  exportAccount (): void {
    this.close()
    this.navigate(ERouter.AccountExport)
  }

  openAddressBook (): void {
    this.close()
    this.navigate(ERouter.AddressBook)
  }

  async logout (): Promise<void> {
    this.close()
    await this.postman.deletePassword()
    this.state.commitLoggedIn(false)
  }

  about (): void {
    this.close()
    this.navigate(ERouter.About)
  }
}
</script>
