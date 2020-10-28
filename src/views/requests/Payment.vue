<template>
  <div class="view notification action">
    <div class="cp content">
      <!-- Loading Indicator -->
      <loading v-show="loading" />

      <!-- Success block -->
      <tx-success v-if="hash" :hash="hash" />

      <a-form v-else>
        <!-- Wallet -->
        <div class="wallet" v-if="state.wallet">
          <div class="label">
            <span v-if="state.wallet">{{ state.wallet.meta.icon }}</span>
            {{ state.walletLabel | short }}
          </div>
          <div class="address">{{ state.wallet.address }}</div>
          <div class="balance">{{ balance | pretty }} {{ getCoin(coin) }}</div>
        </div>

        <!-- Empty Wallet -->
        <div class="wallet-empty" v-if="!state.wallet">
          No wallets found. Create or Import wallet first.
        </div>

        <!-- Icon -->
        <div class="icon"><icon name="invoice" scale="4" /></div>

        <!-- Merchant info -->
        <merchant-info :data="merchant" />

        <!-- Merchant address -->
        <div class="merchant-address">
          <address-link :address="address" />
        </div>

        <!-- Warning -->
        <p class="warning">
          Website requests for payment:
        </p>

        <!-- Amount -->
        <a-alert showIcon :type="amount > balance ? 'error' : 'info'" class="amount">
          <template slot="message">
            <div class="value">{{ `${ $options.filters.pretty(amount)} ${ getCoin(coin) }` }}</div>
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
        <a-button type="primary" size="large" @click.stop="submit()" :disabled="invalid || loading" v-if="!hash">
          Pay
        </a-button>
        <a-button type="danger" size="large" @click="reject()" v-if="!hash && !loading" ghost>
          Reject
        </a-button>
        <a-button type="primary" size="large" @click="close()" v-if="hash && !loading">
          Close
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Coins from '@/mixins/Coins'
import Wallet from '@/mixins/Wallet'
import { EPort } from '@/model/Port'
import { AppEvent } from '@/model/App'
import { ECoin } from '@/model/Wallet'
import { isValidAddress } from 'minterjs-util'
import Channel from '@/services/ChannelService'
import Icon from 'vue-awesome/components/Icon.vue'
import RequestWindow from '@/mixins/RequestWindow'
import { Dictionary } from 'vue-router/types/router'
import Loading from '@/components/common/Loading.vue'
import { Component, Mixins } from 'vue-property-decorator'
import TxSuccess from '@/components/common/tx/TxSuccess.vue'
import MerchantInfo from '@/components/merchant/MerchantInfo.vue'
import AddressLink from '@/components/common/address/AddressLink.vue'

@Component({
  name: 'Payment',
  components: {
    AddressLink,
    Icon,
    Loading,
    MerchantInfo,
    TxSuccess
  }
})
export default class Payment extends Mixins(Coins, Wallet, RequestWindow) {
  address = ''
  amount = ''
  hash = ''
  payload = ''
  channel: Channel

  constructor () {
    super()

    this.channel = new Channel(EPort.Payment)
  }

  get invalid (): boolean {
    return (
      isNaN(this.coin) ||
      !this.address ||
      this.amount === '' ||
      this.amount > this.balance ||
      !isValidAddress(this.address)
    )
  }

  mounted () {
    const query = this.$route.query as Dictionary<string>

    this.tabId = Number(query.tabId) || 0
    this.address = query.address || ''
    this.coin = +query.coin || 0
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

      const hash = await this.postman.txSend({
        address: this.address,
        gasCoin: ECoin.BIP,
        coin: this.coin,
        amount: this.amount,
        payload: this.payload
      })

      this.hash = hash
      this.loading = false
    } catch (e) {
      this.loading = false
      this.ui.commitError(e)
    }
  }

  async reject (): Promise<void> {
    await this.postman.paymentReject(this.tabId)
    window.close()
  }

  async close (): Promise<void> {
    await this.postman.paymentAccept(this.hash, this.tabId)
    window.close()
  }

  beforeClose () {
    if (this.hash) {
      this.postman.paymentAccept(this.hash, this.tabId)
    } else {
      this.postman.paymentReject(this.tabId)
    }
  }
}
</script>
