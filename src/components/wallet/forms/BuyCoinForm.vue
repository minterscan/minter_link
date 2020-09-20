<template>
  <div class="cp convert-form">
    <!-- Loading Indicator -->
    <loading v-show="loading" />

    <!-- Estimate -->
    <convert-estimate
      :mode="mode"
      :coinToBuy="coinToBuy"
      :coinToSell="coinToSell"
      :valueToBuy="valueToBuy"
    />

    <!-- Form -->
    <a-form>
      <a-form-item class="select-form-item">
        <coin-select
          :coins="coins"
          placeholder="Coin to Get"
          :change="changeCoinToBuy"
        />
      </a-form-item>
      <a-form-item>
        <a-input-number
          :min="0"
          size="large"
          v-model.number="valueToBuy"
          :disabled="loading"
          placeholder="Buy Amount"
        />
      </a-form-item>
      <a-form-item class="select-form-item">
        <wallet-coin-select
          :coins="walletCoins"
          :change="changeCoinToSell"
          placeholder="Coin to Spend"
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

    <!-- Low balance indicator -->
    <template v-if="this.valueToBuy !== ''">
      <div class="insufficient-funds" v-if="incufficientFeeFunds">Insufficient funds for fee</div>
    </template>
  </div>
</template>

<script lang="ts">
import Big from 'bignumber.js'
import TxForm from '@/mixins/TxForm'
import { AppEvent } from '@/model/App'
import { UIWalletConvertMode } from '@/model/Wallet'
import Loading from '@/components/common/Loading.vue'
import { Component, Mixins } from 'vue-property-decorator'
import CoinSelect from '@/components/common/form/CoinSelect.vue'
import ConvertEstimate from '@/components/common/ConvertEstimate.vue'
import WalletCoinSelect from '@/components/common/form/WalletCoinSelect.vue'

@Component({
  name: 'BuyCoinForm',
  components: { ConvertEstimate, CoinSelect, Loading, WalletCoinSelect }
})
export default class BuyCoinForm extends Mixins(TxForm) {
  get mode (): UIWalletConvertMode {
    return UIWalletConvertMode.Buy
  }

  get invalid (): boolean {
    return (
      !this.valueToBuy ||
      !this.coinToBuy ||
      !this.coinToSell ||
      this.invalidPayload ||
      this.coinToBuy === this.coinToSell ||
      (new Big(this.valueToSell).toNumber()) < 0
    )
  }

  changeCoinToBuy (coin: string): void {
    this.coinToBuy = coin
  }

  changeCoinToSell (coin: string): void {
    this.coinToSell = coin
  }

  resetForm (): void {
    this.payload = ''
    this.loading = false
    this.advanced = false
  }

  async submit (): Promise<void> {
    try {
      this.loading = true
      const response = await this.postman.txBuy({
        gasCoin: this.gasCoin,
        coinToBuy: this.coinToBuy,
        coinToSell: this.coinToSell,
        valueToBuy: this.valueToBuy,
        payload: this.payload
      })
      const hash = response.data.data.hash
      this.$root.$emit(AppEvent.TxHash, hash)
      this.loading = false
    } catch (e) {
      this.resetForm()
      this.ui.commitError(e)
    }
  }
}
</script>
