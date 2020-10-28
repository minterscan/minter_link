<template>
  <div class="cp convert-estimate">
    <template v-if="willPay">
      <span>~ {{ willPay | sato | pretty }}</span>
      <div class="coin">{{ coinToSell }}</div>
    </template>
    <template v-if="willGet">
      <span>~ {{ willGet | sato | pretty }}</span>
      <div class="coin">{{ coinToBuy }}</div>
    </template>
    <template v-if="!willGet && !willPay">Calculate:</template>
    <a-button shape="circle" icon="question" @click="estimate()" :disabled="invalid" />
  </div>
</template>

<script lang="ts">
import Big from 'bignumber.js'
import Base from '@/mixins/Base'
import { UIWalletConvertMode } from '@/model/Wallet'
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'

// Ignore snake case for Minter Explorer API data
/* eslint-disable @typescript-eslint/camelcase */

@Component
export default class ConvertEstimate extends Mixins(Base) {
  willPay = ''
  willGet = ''
  commission = ''

  @Prop() coinIdToBuy!: number
  @Prop() coinIdToSell!: number
  @Prop() valueToBuy!: string
  @Prop() valueToSell!: string
  @Prop() mode!: UIWalletConvertMode

  get invalid (): boolean {
    return (
      (this.mode === UIWalletConvertMode.Buy && !this.valueToBuy) ||
      (this.mode === UIWalletConvertMode.Sell && !this.valueToSell) ||
      this.coinIdToBuy === this.coinIdToSell
    )
  }

  get coinToBuy (): string {
    const coin = this.network.coins.find(item => item.id === this.coinIdToBuy)

    return coin?.symbol ?? 'BIP'
  }

  get coinToSell (): string {
    const coin = this.network.coins.find(item => item.id === this.coinIdToSell)

    return coin?.symbol ?? 'BIP'
  }

  @Watch('coinToBuy')
  @Watch('coinToSell')
  @Watch('valueToBuy')
  @Watch('valueToSell')
  onInputChange (): void {
    this.reset()
  }

  estimate (): void {
    if (this.mode === UIWalletConvertMode.Buy) { this.estimateBuy() }
    if (this.mode === UIWalletConvertMode.Sell) { this.estimateSell() }
    if (this.mode === UIWalletConvertMode.SellAll) { this.estimateSell() }
  }

  reset (): void {
    this.willPay = ''
    this.willGet = ''
    this.commission = ''
  }

  async estimateBuy (): Promise<void> {
    try {
      const estimate = await this.postman.estimateBuy({
        coin_id_to_buy: `${this.coinIdToBuy}`,
        coin_id_to_sell: `${this.coinIdToSell}`,
        value_to_buy: new Big(this.valueToBuy).toString()
      })

      this.willPay = estimate.will_pay
      this.commission = estimate.commission
    } catch (e) {
      this.ui.commitError(e)
    }
  }

  async estimateSell (): Promise<void> {
    try {
      const estimate = await this.postman.estimateSell({
        coin_id_to_buy: `${this.coinIdToBuy}`,
        coin_id_to_sell: `${this.coinIdToSell}`,
        value_to_sell: new Big(this.valueToSell).toString()
      })

      this.willGet = estimate.will_get
      this.commission = estimate.commission
    } catch (e) {
      this.ui.commitError(e)
    }
  }
}
</script>
