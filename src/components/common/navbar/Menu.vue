<template>
  <a-drawer
    width="100%"
    :get-container="false"
    placement="left"
    @close="close()"
    :visible="ui.menuVisible"
    wrapClassName="cp menu"
  >
    <!-- Title -->
    <template slot="title">
      <a-menu mode="inline" :selectable="false">
        <!-- Data section -->
        <a-menu-item @click="openHome()">
          <a-icon type="home" />
          Minter Link
        </a-menu-item>
      </a-menu>
    </template>

    <!-- Links -->
    <a-menu mode="inline" :selectable="false">
      <!-- Data section -->
      <a-menu-item @click="openNewWallet()">
        <a-icon type="plus" />
        New Wallet
      </a-menu-item>
      <a-menu-item @click="openImportWallet()">
        <a-icon type="download" />
        Import Wallet
      </a-menu-item>
      <a-menu-item @click="openAddressBook()" class="delimiter">
        <a-icon type="team" />
        Contacts
      </a-menu-item>

      <!-- Settings & Logout -->
      <a-menu-item @click="openSettings()">
        <a-icon type="setting" />
        Settings
      </a-menu-item>
      <a-menu-item @click="openExportAccount()">
        <a-icon type="upload" />
        Export Account
      </a-menu-item>
      <a-menu-item @click="logout()">
        <a-icon type="logout" />
        Exit
      </a-menu-item>
    </a-menu>

    <a-menu mode="inline" :selectable="false">
      <a-menu-item @click="openAbout()">
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
import { Component, Mixins, Watch } from 'vue-property-decorator'

@Component
export default class Menu extends Mixins(Base) {
  get source (): string {
    return pckg.repository.url
  }

  get version (): string {
    return pckg.version
  }

  @Watch('$route.path')
  onRoutePathChange (): void {
    this.close()
  }

  openHome (): void {
    this.navigate(ERouter.Vault)
  }

  openNewWallet (): void {
    this.navigate(ERouter.VaultNewWallet)
  }

  openImportWallet (): void {
    this.navigate(ERouter.VaultImportWallet)
  }

  openExportAccount (): void {
    this.navigate(ERouter.AccountExport)
  }

  openAddressBook (): void {
    this.navigate(ERouter.AddressBook)
  }

  openSettings (): void {
    this.navigate(ERouter.Settings)
  }

  openAbout (): void {
    this.navigate(ERouter.About)
  }

  async logout (): Promise<void> {
    try {
      this.state.commitLoggedIn(false)

      await this.postman.deletePassword()
    } catch (e) {
      this.ui.commitError(e)
    }
  }

  close (): void {
    this.ui.commitMenuVisible(false)
  }
}
</script>
