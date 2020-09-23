<template>
  <div class="cp settings-wallets">
    <!-- Empty List -->
    <data-empty text="You have no wallets yet :(" v-if="empty" />

    <template v-else>
      <a-card size="small" v-for="(wallet) in wallets" :key="wallet.address">
        <!-- Title -->
        <div class="wallet" slot="title">
          <div class="start">
            <div class="meta">
              <span class="icon">{{ wallet.meta.icon }}</span>
              <b>{{ wallet.meta.label || wallet.address | short }}</b>
            </div>
            <address-link :address="wallet.address" />
          </div>
          <div class="end">
            <a-button icon="upload" @click="vaultUnlock(wallet.address)">Export</a-button>
          </div>
        </div>

        <!-- Seed -->
        <template v-if="activeWallet === wallet.address && seed">
          <h4 class="ant-typography">Auto close in {{ seedClose / 1000 }} seconds</h4>
          <a-alert
            type="info"
            :message="seed"
            :showIcon="true"
            class="seed"
          >
            <clipboard-button :text="seed" type="primary" slot="icon" />
          </a-alert>
        </template>

        <!-- Connected sites -->
        <template v-if="websites[wallet.address] && Object.keys(websites[wallet.address]).length">
          <h4 class="ant-typography">Connected sites</h4>
          <ul>
            <li v-for="(timestamp, domain) in websites[wallet.address]" :key="domain">
              <div class="content">
                <a :href="domain" :title="domain" target="_blank" class="ant-typography">{{ domain }}</a>
                access granted {{ timestamp | timestamp }}
              </div>
              <div class="actions">
                <a-button
                  ghost
                  size="small"
                  icon="close"
                  type="danger"
                  @click="deleteWebsite(wallet.address, domain)"
                />
              </div>
            </li>
          </ul>
        </template>

        <!-- No sites -->
        <p v-else>No sites connected</p>
      </a-card>
    </template>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import { MinterWallet } from '@/model/Wallet'
import { VaultConnectedWebsites } from '@/model/Vault'
import DataEmpty from '@/components/common/DataEmpty.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import ClipboardButton from '@/components/common/ClipboardButton.vue'
import AddressLink from '@/components/common/address/AddressLink.vue'

@Component({
  name: 'SettingsConnections',
  components: { AddressLink, ClipboardButton, DataEmpty }
})
export default class SettingsConnections extends Mixins(Base) {
  activeWallet = ''
  wallets: MinterWallet[] = []
  websites: VaultConnectedWebsites = {}
  seed = ''
  seedClose = 0
  seedCloseInterval: ReturnType<typeof setInterval> | null = null

  get empty (): boolean {
    return !Object.keys(this.wallets).length
  }

  @Watch('state.vault.wallets', { immediate: true })
  onWalletsChange (value: MinterWallet[]): void {
    this.wallets = value
  }

  @Watch('state.vault.connectedWebsites', { immediate: true })
  onConnectedWebsitesChange (value: VaultConnectedWebsites): void {
    this.websites = value
  }

  mounted (): void {
    this.$root.$on(AppEvent.WalletSeed, (seed: string) => {
      this.seed = seed
      this.seedClose = this.config.const.autoRedirectTimeout * 50

      this.seedCloseInterval = setInterval(() => {
        this.$set(this, 'seedClose', this.seedClose - 1000)

        if (this.seedClose < 0 && this.seedCloseInterval) {
          this.seed = ''
          this.activeWallet = ''
          clearInterval(this.seedCloseInterval)
        }
      }, 1000)
    })
  }

  async deleteWebsite (address: string, domain: string): Promise<void> {
    this.ui.commitLoading(true)
    const settings = await this.postman.deleteConnectedWebsite({ address, domain })
    this.state.commitVaultConnectedWebsites(settings)

    setTimeout(() => {
      this.ui.commitLoading(false)
    }, this.config.const.autoRedirectTimeout)
  }

  vaultUnlock (address: string): void {
    this.seed = ''
    this.activeWallet = address
    if (this.seedCloseInterval) clearInterval(this.seedCloseInterval)

    this.$root.$emit(AppEvent.ExportSeedUnlock, address)
  }
}
</script>
