<template>
  <div class="view notification">
    <div class="cp content">
      <!-- Loading Indicator -->
      <loading v-show="loading" />

      <a-form>
        <!-- Wallet -->
        <div class="wallet" v-if="state.wallet">
          <div class="label">
            <span v-if="state.wallet">{{ state.wallet.meta.icon }}</span>
            {{ state.walletLabel | short }}
          </div>
          <div class="address"><address-link :address="state.wallet.address" /></div>
          <div class="balance">{{ $options.filters.pretty(balance) }} {{ coin }}</div>
        </div>

        <!-- Empty Wallet -->
        <div class="wallet-empty" v-if="!state.wallet">
          No wallets found. Create or Import wallet first.
        </div>

        <!-- Icon -->
        <div class="icon"><icon name="connect" scale="4" /></div>

        <!-- Merchant info -->
        <merchant-info v-if="merchant" :data="merchant" />

        <!-- Text -->
        <p class="warning">
          Website requests access to your current account address.
          <br>Always make sure you trust the sites you interact with.
        </p>
      </a-form>

      <!-- Buttons -->
      <div class="buttons">
        <a-button type="primary" @click="submit()" :disabled="loading || !state.wallet">
          Accept
        </a-button>
        <a-button type="danger outlined" @click="reject()" :disabled="loading">
          Reject
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Wallet from '@/mixins/Wallet'
import { EPort } from '@/model/Port'
import Channel from '@/services/Channel'
import { VaultWallets } from '@/model/Vault'
import Icon from 'vue-awesome/components/Icon.vue'
import RequestWindow from '@/mixins/RequestWindow'
import { Dictionary } from 'vue-router/types/router'
import Loading from '@/components/common/Loading.vue'
import { Component, Mixins } from 'vue-property-decorator'
import MerchantInfo from '@/components/merchant/MerchantInfo.vue'
import AddressLink from '@/components/common/address/AddressLink.vue'

@Component({
  name: 'RequestConnect',
  components: {
    AddressLink,
    Icon,
    Loading,
    MerchantInfo
  }
})
export default class RequestConnect extends Mixins(RequestWindow, Wallet) {
  address = ''
  channel: Channel

  constructor () {
    super()

    this.channel = new Channel(EPort.Connect)
  }

  get invalid (): boolean {
    return (
      !this.merchant ||
      !this.merchant.url
    )
  }

  get wallets (): VaultWallets {
    if (!this.state.vault) return {}

    return this.state.vault?.wallets
  }

  get balance (): string {
    if (!this.state.wallet) return ''
    if (!this.state.wallet.balances) return ''

    const balance = this.state.wallet.balances.find(item => item.coin === this.coin)

    if (!balance) return ''

    return balance.amount
  }

  mounted () {
    const query = this.$route.query as Dictionary<string>

    this.tabId = Number(query.tabId) || 0
    this.merchant = {
      name: query.merchantName,
      url: query.merchantUrl
    }
  }

  reset (): void {
    this.loading = false
  }

  async submit (): Promise<void> {
    try {
      this.loading = true
      this.accept()

      setTimeout(() => {
        this.loading = false
      }, this.config.const.autoRedirectTimeout)
    } catch (e) {
      this.loading = false
      this.reject()
    }
  }

  async reject (): Promise<void> {
    await this.postman.connectReject(this.tabId)
    window.close()
  }

  async accept (): Promise<void> {
    if (!this.merchant) return
    if (!this.state.wallet) return

    await this.postman.addConnectedWebsite(this.merchant?.url)
    await this.postman.connectAccept(this.tabId)
    window.close()
  }

  beforeClose () {
    this.postman.connectReject(this.tabId)
  }
}
</script>
