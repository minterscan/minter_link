<template>
  <div class="cp convert-form">
    <!-- Loading Indicator -->
    <loading v-show="loading" />

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

      <!-- Advanced -->
      <a-form-item class="advanced">
        <a-switch id="advanced" v-model="advanced" />
        <label for="advanced">Advanced Mode</label>
      </a-form-item >

      <!-- Gas Coin -->
      <a-form-item class="fee-coin" v-if="advanced">
          <label>Coin to pay fee:</label>
          <wallet-coin-select
          :coins="walletCoins"
          :change="changeGasCoin"
          placeholder="Coin to pay fee"
        />
      </a-form-item>

      <!-- Payload Input -->
      <a-form-item v-if="advanced">
        <a-textarea
          v-model="payload"
          :disabled="loading"
          placeholder="Message"
          :autoSize="{ minRows: 3, maxRows: 6 }"
        />
      </a-form-item>
    </a-form>

    <!-- Low balance indicatoЩr -->
    <template v-if="this.valueToSell !== ''">
      <div class="insufficient-funds" v-if="incufficientFeeFunds">Insufficient funds for fee</div>
      <div class="insufficient-funds" v-if="!incufficientFeeFunds && incufficientFunds">Insufficient funds</div>
    </template>
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
  coinToBuy = ''
  valueToSell = ''
  coinToSell: string = ECoin.BIP

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

  get incufficientFunds (): boolean {
    return !this.hash && this.valueToSell > this.maxAmount
  }

  @Watch('coinToSell')
  onCoinChange (): void {
    this.valueToSell = ''
  }

  @Watch('coinToSell', { immediate: true })
  @Watch('payload', { immediate: true })
  onPayloadChange (): void {
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

  resetForm (): void {
    this.coinToBuy = ''
    this.coinToSell = ECoin.BIP
    this.valueToSell = ''
    this.payload = ''
    this.loading = false
    this.advanced = false
  }

  async submit (): Promise<void> {
    try {
      this.loading = true

      const hash = await this.postman.txSell({
        gasCoin: this.gasCoin,
        coinToBuy: this.coinToBuy,
        coinToSell: this.coinToSell,
        valueToSell: this.valueToSell,
        payload: this.payload
      })

      this.$root.$emit(AppEvent.TxHash, hash)
      this.loading = false
    } catch (e) {
      this.resetForm()
      this.ui.commitError(e)
    }
  }
}
</script>
