<template>
  <div class="view notification">
    <div class="cp action-send">
      <!-- Loading Indicator -->
      <loading v-show="loading" />
      <!-- Success block -->
      <tx-success v-if="hash" :hash="hash" />

      <a-form v-else>
        <!-- Wallet -->
        <div class="wallet" :style="`--color: ${state.wallet.meta.color}`" v-if="state.wallet">
          <div class="address">{{ state.wallet.address }}</div>
          <div class="balance">{{ $options.filters.pretty(balance) }} {{ coin }}</div>
        </div>

        <!-- Merchant info -->
        <merchant-info :data="merchant" />

        <!-- Merchant address -->
        <div class="merchant-address">
          <address-link :address="address" />
        </div>

        <!-- Amount -->
        <a-alert showIcon type="info" class="amount">
          <template slot="message">
            <div class="value">{{ `${ $options.filters.pretty(amount)} ${ coin }` }}</div>
            <div class="not-enough" v-if="amount > balance">Not enough balance</div>
          </template>
          <icon name="bip" scale="1.5" slot="icon" />
        </a-alert>
        <!-- Payload -->
        <a-alert showIcon type="info" class="payload" :message="payload" v-if="payload">
          <icon name="message" scale="1.5" slot="icon" />
        </a-alert>
      </a-form>

      <!-- Buttons -->
      <div class="buttons">
        <a-button size="large" type="primary" @click="submit()" :disabled="invalid || loading" v-if="!hash">
          Accept
        </a-button>
        <a-button size="large" type="danger" @click="reject()" v-if="!hash && !loading">
          Reject
        </a-button>
        <a-button size="large" @click="close()" v-if="hash && !loading">
          Close
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import Wallet from '@/mixins/Wallet'
import { AppEvent } from '@/model/App'
import { ECoin } from '@/model/Wallet'
import { Merchant } from 'minter-connect'
import { VaultWallets } from '@/model/Vault'
import { isValidAddress } from 'minterjs-util'
import Icon from 'vue-awesome/components/Icon.vue'
import { Dictionary } from 'vue-router/types/router'
import Loading from '@/components/common/Loading.vue'
import { Component, Mixins } from 'vue-property-decorator'
import TxSuccess from '@/components/common/tx/TxSuccess.vue'
import MerchantInfo from '@/components/merchant/MerchantInfo.vue'
import AddressLink from '@/components/common/address/AddressLink.vue'

@Component({
  name: 'Notification',
  components: {
    AddressLink,
    Icon,
    Loading,
    MerchantInfo,
    TxSuccess
  }
})
export default class Notification extends Mixins(Base, Wallet) {
  tabId = 0
  address = ''
  coin = ''
  amount = ''
  hash = ''
  loading = false
  payload = 'Order #190567'
  merchant: Merchant | null = null

  get invalid (): boolean {
    return (
      !this.coin ||
      !this.address ||
      this.amount === '' ||
      this.amount > this.balance ||
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
    const query = this.$route.query as Dictionary<string>

    this.tabId = Number(query.tabId) || 0
    this.address = query.address || ''
    this.coin = query.coin || ''
    this.amount = query.amount || ''
    this.payload = query.payload || ''
    this.merchant = {
      name: query.merchantName,
      url: query.merchantUrl
    }
  }

  reset (): void {
    this.address = ''
    this.coin = ECoin.BIP
    this.amount = ''
    this.payload = ''
    this.hash = ''
    this.loading = false
  }

  async submit (): Promise<void> {
    try {
      this.loading = true
      this.$root.$emit(AppEvent.FormSubmit)

      const response = await this.postman.txSend({
        address: this.address,
        coin: this.coin,
        amount: this.amount,
        payload: this.payload
      })

      this.hash = response.data.data.hash
      this.loading = false
      this.$root.$emit(AppEvent.FormSuccess)
    } catch (e) {
      this.loading = false
      this.ui.commitError(e.message)
      this.$root.$emit(AppEvent.FormReset)
    }
  }

  async reject (): Promise<void> {
    await this.postman.paymentReject(this.tabId)
    window.close()
  }

  async close (): Promise<void> {
    await this.postman.paymentAccept(this.tabId)
    window.close()
  }
}
</script>
