<template>
  <div class="cp convert-form">
    <!-- Loading Indicator -->
    <loading v-show="loading" />
    <!-- Low balance indicator -->
    <div class="insufficient-funds" v-if="valueToSell > maxAmount">Insufficient funds</div>

    <!-- Estimate -->
    <convert-estimate
      :mode="mode"
      :coinToBuy="coinToBuy"
      :coinToSell="coinToSell"
      :valueToSell="valueToSell"
    />

    <!-- Form -->
    <a-form>
      <a-form-item class="select-form-item">
        <wallet-coin-select
          :coins="walletCoins"
          :change="changeCoinToSell"
          placeholder="Coin to Spend"
        />
      </a-form-item>
      <a-form-item>
        <field-amount :change="changeValueToSell" :max="maxAmount" :defaultValue="valueToSell" :placeholder="`Value to Sell`" />
      </a-form-item>
      <a-form-item class="select-form-item">
        <coin-select
          :coins="coins"
          placeholder="Coin to Get"
          :change="changeCoinToBuy"
        />
      </a-form-item>

      <!-- Payload Switcher -->
      <a-form-item>
        <a-switch id="with-payload" v-model="withPayload" />
        <label for="with-payload" title="Payload">Payload</label>
      </a-form-item>

      <!-- Payload -->
      <a-form-item v-if="withPayload">
        <a-textarea
          v-model="payload"
          :disabled="loading"
          placeholder="Message"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import Big from 'bignumber.js'
import TxForm from '@/mixins/TxForm'
import { ETxType } from '@/model/Tx'
import { AppEvent } from '@/model/App'
import Loading from '@/components/common/Loading.vue'
import { UIWalletConvertMode, ECoin } from '@/model/Wallet'
import CoinSelect from '@/components/common/form/CoinSelect.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import FieldAmount from '@/components/common/form/FieldAmount.vue'
import ConvertEstimate from '@/components/common/ConvertEstimate.vue'
import WalletCoinSelect from '@/components/common/form/WalletCoinSelect.vue'

@Component({
  name: 'SellCoinForm',
  components: {
    Loading,
    CoinSelect,
    FieldAmount,
    ConvertEstimate,
    WalletCoinSelect
  }
})
export default class SellCoinForm extends Mixins(TxForm) {
  coinToSell: string = ECoin.BIP
  coinToBuy = ''
  valueToSell = ''

  get mode (): UIWalletConvertMode {
    return UIWalletConvertMode.Sell
  }

  get invalid (): boolean {
    return (
      !this.valueToSell ||
      !this.coinToBuy ||
      !this.coinToSell ||
      this.invalidPayload ||
      this.valueToSell > this.maxAmount ||
      this.coinToBuy === this.coinToSell ||
      (new Big(this.valueToSell).toNumber()) < 0
    )
  }

  @Watch('coinToSell')
  onCoinChange () {
    this.valueToSell = ''
  }

  @Watch('coinToSell', { immediate: true })
  @Watch('payload', { immediate: true })
  onPayloadChange () {
    this.changeMaxAmount()

    if (this.valueToSell >= this.maxAmount) {
      this.changeValueToSell(this.maxAmount)
    }
  }

  changeCoinToBuy (coin: string): void {
    this.coinToBuy = coin
  }

  changeCoinToSell (coin: string): void {
    this.coinToSell = coin
  }

  changeValueToSell (value: string): void {
    this.valueToSell = value
  }

  changeMaxAmount (): void {
    if (!this.state.wallet) return
    if (!this.state.wallet.balances) return

    const balance = this.state.wallet.balances.find((item) => item.coin === this.coinToSell)

    if (!balance) return

    let amount = new Big(balance.amount)

    if (this.coinToSell === ECoin.BIP) {
      amount = amount.minus(this.getFee(ETxType.SellCoin))
    }

    this.maxAmount = amount ? `${amount.toFixed()}` : ''
  }

  reset (): void {
    this.coinToBuy = ''
    this.coinToSell = ''
    this.valueToSell = ''
    this.payload = ''
    this.loading = false
  }

  async submit (): Promise<void> {
    try {
      this.loading = true
      const response = await this.postman.txSell({
        coinToBuy: this.coinToBuy,
        coinToSell: this.coinToSell,
        valueToSell: this.valueToSell,
        payload: this.payload
      })
      const hash = response.data.data.hash
      this.$root.$emit(AppEvent.TxHash, hash)
      this.loading = false
    } catch (e) {
      this.reset()
      this.ui.commitError(e.message)
    }
  }
}
</script>
