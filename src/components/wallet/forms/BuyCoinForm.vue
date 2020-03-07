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
          v-model="valueToBuy"
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

  reset (): void {
    this.payload = ''
    this.loading = false
  }

  async submit (): Promise<void> {
    try {
      this.loading = true
      const response = await this.postman.txBuy({
        coinToBuy: this.coinToBuy,
        coinToSell: this.coinToSell,
        valueToBuy: this.valueToBuy,
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
