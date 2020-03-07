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

@Component
export default class ConvertEstimate extends Mixins(Base) {
  willPay = ''
  willGet = ''
  commission = ''

  @Prop() coinToBuy!: string
  @Prop() coinToSell!: string
  @Prop() valueToBuy!: string
  @Prop() valueToSell!: string
  @Prop() mode!: UIWalletConvertMode

  get invalid (): boolean {
    return (
      (this.mode === UIWalletConvertMode.Buy && !this.valueToBuy) ||
      (this.mode === UIWalletConvertMode.Buy && !this.coinToBuy) ||
      (this.mode === UIWalletConvertMode.Buy && !this.coinToSell) ||
      (this.mode === UIWalletConvertMode.Sell && !this.valueToSell) ||
      (this.mode === UIWalletConvertMode.Sell && !this.coinToBuy) ||
      (this.mode === UIWalletConvertMode.Sell && !this.coinToSell) ||
      (this.mode === UIWalletConvertMode.SellAll && !this.coinToBuy) ||
      (this.mode === UIWalletConvertMode.SellAll && !this.coinToSell) ||
      this.coinToBuy === this.coinToSell
    )
  }

  @Watch('coinToBuy')
  @Watch('coinToSell')
  @Watch('valueToBuy')
  @Watch('valueToSell')
  onInputChange () {
    this.reset()
  }

  estimate () {
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
        coinToBuy: this.coinToBuy,
        coinToSell: this.coinToSell,
        valueToBuy: new Big(this.valueToBuy).toString()
      })

      this.willPay = estimate.will_pay
      this.commission = estimate.commission
    } catch (e) {
      this.ui.commitError(e.message)
    }
  }

  async estimateSell (): Promise<void> {
    try {
      const estimate = await this.postman.estimateSell({
        coinToBuy: this.coinToBuy,
        coinToSell: this.coinToSell,
        valueToSell: new Big(this.valueToSell).toString()
      })

      this.willGet = estimate.will_get
      this.commission = estimate.commission
    } catch (e) {
      this.ui.commitError(e.message)
    }
  }
}
</script>
