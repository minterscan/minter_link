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
      <a-form-item>
        <wallet-coin-select
          :coins="walletCoins"
          :change="changeCoinToSell"
          placeholder="Coin to Spend"
        />
      </a-form-item>
      <a-form-item>
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
import Base from '@/mixins/Base'
import TxForm from '@/mixins/TxForm'
import { AppEvent } from '@/model/App'
import { UIWalletConvertMode } from '@/model/Wallet'
import Loading from '@/components/common/Loading.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import CoinSelect from '@/components/common/form/CoinSelect.vue'
import ConvertEstimate from '@/components/common/ConvertEstimate.vue'
import WalletCoinSelect from '@/components/common/form/WalletCoinSelect.vue'

@Component({
  name: 'SellAllCoinForm',
  components: {
    Loading,
    CoinSelect,
    ConvertEstimate,
    WalletCoinSelect
  }
})
export default class SellAllCoinForm extends Mixins(Base, TxForm) {
  get mode (): UIWalletConvertMode {
    return UIWalletConvertMode.SellAll
  }

  get invalid (): boolean {
    return (
      !this.coinToBuy ||
      !this.coinToSell ||
      this.coinToBuy === this.coinToSell
    )
  }

  @Watch('coinToSell', { immediate: true })
  onCoinToSellChange (coin: string) {
    if (!this.state) return
    if (!this.state.wallet) return
    if (!this.state.wallet.balances) return

    const balance = this.state.wallet.balances.find((item) => item.coin === coin)

    if (balance) this.valueToSell = balance.amount
  }

  changeCoinToSell (coin: string): void {
    this.coinToSell = coin
  }

  changeCoinToBuy (coin: string): void {
    this.coinToBuy = coin
  }

  reset (): void {
    this.coinToSell = ''
    this.coinToBuy = ''
    this.payload = ''
    this.loading = false
  }

  async submit (): Promise<void> {
    try {
      this.loading = true
      const response = await this.postman.txSellAll({
        coinToBuy: this.coinToBuy,
        coinToSell: this.coinToSell,
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
