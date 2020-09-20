<template>
  <div class="view notification">
    <!-- Content -->
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
        <div class="icon"><icon name="signature" scale="4" /></div>

        <!-- Merchant info -->
        <merchant-info :data="merchant" />

        <!-- Merchant address -->
        <div class="merchant-address">
          <address-link :address="address" />
        </div>

        <!-- Warning -->
        <p class="warning">
          Website requests digital signature.
          <br>Following message will be signed with your private key:
        </p>

        <!-- Payload -->
        <a-alert showIcon type="info" class="payload" :message="message" v-if="message">
          <icon name="message" scale="1.5" slot="icon" />
        </a-alert>
      </a-form>

      <!-- Buttons -->
      <div class="buttons">
        <a-button type="primary" @click="submit()" :disabled="loading">
          Accept
        </a-button>
        <a-button type="danger" @click="reject()" :disabled="loading">
          Reject
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { EPort } from '@/model/Port'
import Wallet from '@/mixins/Wallet'
import { AppEvent } from '@/model/App'
import Channel from '@/services/Channel'
import { VaultWallets } from '@/model/Vault'
import { isValidAddress } from 'minterjs-util'
import RequestWindow from '@/mixins/RequestWindow'
import Icon from 'vue-awesome/components/Icon.vue'
import { Dictionary } from 'vue-router/types/router'
import Loading from '@/components/common/Loading.vue'
import { Component, Mixins } from 'vue-property-decorator'
import TxSuccess from '@/components/common/tx/TxSuccess.vue'
import MerchantInfo from '@/components/merchant/MerchantInfo.vue'
import AddressLink from '@/components/common/address/AddressLink.vue'

@Component({
  name: 'RequestSign',
  components: {
    AddressLink,
    Icon,
    Loading,
    MerchantInfo,
    TxSuccess
  }
})
export default class RequestSign extends Mixins(RequestWindow, Wallet) {
  message = ''
  address = ''
  channel: Channel

  constructor () {
    super()

    this.channel = new Channel(EPort.Sign)
  }

  get invalid (): boolean {
    return (
      !this.address ||
      this.message === '' ||
      !isValidAddress(this.address)
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
    this.fill()
  }

  fill () {
    const query = this.$route.query as Dictionary<string>

    this.tabId = Number(query.tabId) || 0
    this.message = query.message || ''
    this.merchant = {
      name: query.merchantName,
      url: query.merchantUrl
    }
  }

  reset (): void {
    this.message = ''
    this.loading = false
  }

  async submit (): Promise<void> {
    try {
      this.loading = true
      this.$root.$emit(AppEvent.FormSubmit)

      setTimeout(async () => {
        const signedMessage = await this.postman.sign(this.message)

        this.loading = false
        this.accept(signedMessage)
      }, this.config.const.autoRedirectTimeout)
    } catch (e) {
      this.loading = false
      this.reject()
    }
  }

  async reject (): Promise<void> {
    await this.postman.signReject(this.tabId)

    window.close()
  }

  async accept (signedMessage: string): Promise<void> {
    await this.postman.signAccept(signedMessage, this.tabId)

    window.close()
  }

  beforeClose () {
    this.postman.signReject(this.tabId)
  }
}
</script>
