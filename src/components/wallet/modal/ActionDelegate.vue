<template >
  <a-modal
    centered
    class="cp action-delegate"
    title="Delegate coins"
    :visible="true"
    :okText="hash ? 'Delegate again' : 'Delegate'"
    cancelText="Close"
    @ok="hash ? resetHash() : submit()"
    :confirmLoading="loading"
    :okButtonProps="{ props: { disabled: loading || (!hash && invalid) } }"
    :cancelButtonProps="{ props: { disabled: loading } }"
    @cancel="close"
  >
    <!-- Tx Success -->
    <tx-success v-if="hash" :hash="hash" />

    <!-- Initial state -->
    <a-form v-else>
      <!-- Validator -->
      <a-form-item class="select-form-item">
        <validator-select :validators="network.validators" :change="changeValidator" />
      </a-form-item>

      <!-- Amount & Coin -->
      <a-form-item>
        <a-input-group compact>
          <field-amount :change="changeStake" :max="maxAmount" :defaultValue="stake" />
          <wallet-coin-select :coins="walletCoins" :change="changeCoin" />
        </a-input-group>
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

    <!-- Loading Indicator -->
    <loading v-show="loading" />
    <!-- Low balance indicator -->
    <div class="insufficient-funds" v-if="stake > maxAmount">Insufficient funds</div>
  </a-modal>
</template>

<script lang="ts">
import Big from 'bignumber.js'
import TxForm from '@/mixins/TxForm'
import { ETxType } from '@/model/Tx'
import { AppEvent } from '@/model/App'
import Loading from '@/components/common/Loading.vue'
import { isValidPublicKeyString } from 'minterjs-util'
import TxSuccess from '@/components/common/tx/TxSuccess.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import FieldAmount from '@/components/common/form/FieldAmount.vue'
import ValidatorSelect from '@/components/common/form/ValidatorSelect.vue'
import WalletCoinSelect from '@/components/common/form/WalletCoinSelect.vue'
import { ECoin } from '@/model/Wallet'

@Component({
  name: 'ActionDelegate',
  components: { Loading, FieldAmount, TxSuccess, ValidatorSelect, WalletCoinSelect }
})
export default class ActionDelegate extends Mixins(TxForm) {
  pubKey = ''
  coin = ECoin.BIP
  stake = ''

  get invalid (): boolean {
    return (
      !this.pubKey ||
      this.stake === '' ||
      this.invalidPayload ||
      this.stake > this.maxAmount ||
      !isValidPublicKeyString(this.pubKey)
    )
  }

  @Watch('coin')
  onCoinChange (): void {
    this.stake = ''
  }

  @Watch('coin', { immediate: true })
  @Watch('payload', { immediate: true })
  onPayloadChange (): void {
    this.changeMaxAmount()

    if (this.stake >= this.maxAmount) {
      this.changeStake(this.maxAmount)
    }
  }

  changeValidator (pubKey: string): void {
    this.pubKey = pubKey
  }

  changeCoin (coin: number): void {
    this.coin = coin
  }

  changeStake (stake: string): void {
    this.stake = stake
  }

  changeMaxAmount (): void {
    if (!this.state.wallet) return
    if (!this.state.wallet.balances) return

    const balance = this.state.wallet.balances.find((item) => item.coin.id === this.coin)

    if (!balance) return

    const amount = new Big(balance.amount).minus(this.getFee(ETxType.Delegate))

    this.maxAmount = amount ? `${amount.toFixed()}` : ''
  }

  resetForm (): void {
    this.pubKey = ''
    this.coin = ECoin.BIP
    this.stake = ''
    this.payload = ''
    this.loading = false
    this.advanced = false
  }

  resetHash (): void {
    this.hash = ''
  }

  async submit (): Promise<void> {
    try {
      this.loading = true

      const hash = await this.postman.txDelegate({
        pubKey: this.pubKey,
        coin: this.coin,
        gasCoin: this.gasCoin,
        stake: this.stake,
        payload: this.payload
      })

      this.resetForm()
      this.hash = hash
    } catch (e) {
      this.loading = false
      this.ui.commitError(e)
    }
  }

  close (): void {
    this.$root.$emit(AppEvent.WalletActionDelegateClose)
  }
}
</script>
