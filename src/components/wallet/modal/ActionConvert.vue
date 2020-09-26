<template >
  <a-modal
    centered
    :visible="true"
    title="Convert coins"
    class="cp action-convert"
    @ok="hash ? reset() : submit()"
    :okText="hash ? 'Convert again' : 'Convert'"
    :okButtonProps="{ props: { disabled: loading || (!hash && invalid) } }"
    @cancel="close()"
    cancelText="Close"
    :cancelButtonProps="{ props: { disabled: loading } }"
    :confirmLoading="loading"
  >
    <!-- Success -->
    <tx-success v-if="hash" :hash="hash" />

    <!-- Content -->
    <template v-else>
      <!-- Convert mode switcher -->
      <div class="mode-menu">
        <a-radio-group v-model="mode">
          <a-radio-button
            :key="key"
            :value="item"
            v-for="(item, key) in modes"
          >
            {{ getModeLabel(item) }}
          </a-radio-button>
        </a-radio-group>
      </div>

      <!-- Forms -->
      <buy-coin-form :coins="coins" v-if="modeBuyCoin" />
      <sell-coin-form :coins="coins" v-if="modeSellCoin" />
      <sell-all-coin-form :coins="coins" v-if="modeSellAllCoin" />
    </template>
  </a-modal>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import Icon from 'vue-awesome/components/Icon.vue'
import TxSuccess from '@/components/common/tx/TxSuccess.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import BuyCoinForm from '@/components/wallet/forms/BuyCoinForm.vue'
import SellCoinForm from '@/components/wallet/forms/SellCoinForm.vue'
import { MinterWalletBalance, UIWalletConvertMode } from '@/model/Wallet'
import SellAllCoinForm from '@/components/wallet/forms/SellAllCoinForm.vue'

@Component({
  name: 'ActionConvert',
  components: {
    Icon,
    BuyCoinForm,
    SellCoinForm,
    SellAllCoinForm,
    TxSuccess
  }
})
export default class ActionConvert extends Mixins(Base) {
  hash = ''
  invalid = true
  loading = false
  coins: string[] = []
  mode = UIWalletConvertMode.Buy
  modes: UIWalletConvertMode[] = [
    UIWalletConvertMode.Buy,
    UIWalletConvertMode.Sell,
    UIWalletConvertMode.SellAll
  ]

  get modeBuyCoin (): boolean {
    return this.mode === UIWalletConvertMode.Buy
  }

  get modeSellCoin (): boolean {
    return this.mode === UIWalletConvertMode.Sell
  }

  get modeSellAllCoin (): boolean {
    return this.mode === UIWalletConvertMode.SellAll
  }

  @Watch('mode')
  onModeChange (): void {
    this.invalid = true
  }

  @Watch('ui.error')
  onUiErrorChange (): void {
    this.loading = false
  }

  @Watch('state.wallet.balances', { immediate: true })
  onWalletBalancesChange (balances: MinterWalletBalance[]): void {
    this.coins = []

    balances.map((item) => {
      this.coins.push(item.coin)
    })
  }

  mounted (): void {
    this.listen()
  }

  listen (): void {
    this.$root.$on(AppEvent.TxHash, (hash: string) => {
      this.hash = hash
      this.loading = false
    })
    this.$root.$on(AppEvent.FormInvalid, (value: boolean) => {
      this.invalid = value
    })
  }

  getMode (mode: UIWalletConvertMode): boolean {
    return this.mode === mode
  }

  setMode (mode: UIWalletConvertMode): void {
    this.mode = mode
  }

  getModeLabel (mode: number): string {
    return UIWalletConvertMode[mode]
  }

  submit (): void {
    this.loading = true
    this.$root.$emit(AppEvent.FormSubmit)
  }

  reset (): void {
    this.hash = ''
    this.$root.$emit(AppEvent.FormReset)
  }

  close (): void {
    this.$root.$emit(AppEvent.WalletActionConvertClose)
  }

  destroyed (): void {
    this.$root.$off(AppEvent.FormInvalid)
  }
}
</script>
