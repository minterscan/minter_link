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
    <template v-if="this.coinToBuy !== ''">
      <div class="insufficient-funds" v-if="incufficientFeeFunds">Insufficient funds for fee</div>
    </template>
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
  onCoinToSellChange (coin: string): void {
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

  resetForm (): void {
    this.coinToSell = ''
    this.coinToBuy = ''
    this.payload = ''
    this.loading = false
    this.advanced = false
  }

  async submit (): Promise<void> {
    try {
      this.loading = true

      const hash = await this.postman.txSellAll({
        gasCoin: this.gasCoin,
        coinToBuy: this.coinToBuy,
        coinToSell: this.coinToSell,
        payload: this.payload
      })

      this.resetForm()
      this.$root.$emit(AppEvent.TxHash, hash)
    } catch (e) {
      this.loading = false
      this.ui.commitError(e)
    }
  }
}
</script>
