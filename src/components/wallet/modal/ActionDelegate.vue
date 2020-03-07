<template >
  <a-modal
    centered
    class="cp action-delegate"
    title="Delegate coins"
    :visible="true"
    :okText="hash ? 'Delegate again' : 'Delegate'"
    cancelText="Close"
    @ok="hash ? reset() : submit()"
    :confirmLoading="loading"
    :okButtonProps="{ props: { disabled: loading || invalid } }"
    :cancelButtonProps="{ props: { disabled: loading } }"
    @cancel="close"
  >
    <!-- Tx Success -->
    <tx-success v-if="hash" :hash="hash" />

    <a-form v-else>
      <a-form-item class="select-form-item">
        <validator-select :validators="validators" :change="changeValidator" />
      </a-form-item>
      <a-form-item>
        <a-input-group compact>
          <field-amount :change="changeStake" :max="maxAmount" :defaultValue="stake" />
          <wallet-coin-select :coins="walletCoins" :change="changeCoin" />
        </a-input-group>
      </a-form-item>

      <!-- Payload -->
      <a-form-item>
        <a-switch id="with-payload" v-model="withPayload" />
        <label for="with-payload" title="Payload">Payload</label>
      </a-form-item>
      <a-form-item v-if="withPayload">
        <a-textarea
          v-model="payload"
          :disabled="loading"
          placeholder="Message"
          :autosize="{ minRows: 3, maxRows: 6 }"
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
import { ECoin } from '@/model/Wallet'
import Loading from '@/components/common/Loading.vue'
import { isValidPublicKeyString } from 'minterjs-util'
import TxSuccess from '@/components/common/tx/TxSuccess.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import FieldAmount from '@/components/common/form/FieldAmount.vue'
import ValidatorSelect from '@/components/common/form/ValidatorSelect.vue'
import WalletCoinSelect from '@/components/common/form/WalletCoinSelect.vue'

@Component({
  name: 'ActionDelegate',
  components: { Loading, FieldAmount, TxSuccess, ValidatorSelect, WalletCoinSelect }
})
export default class ActionDelegate extends Mixins(TxForm) {
  pubKey = ''
  coin = ''
  stake = ''

  get invalid (): boolean {
    return (
      !this.pubKey ||
      !this.coin ||
      this.stake === '' ||
      this.invalidPayload ||
      this.stake > this.maxAmount ||
      !isValidPublicKeyString(this.pubKey)
    )
  }

  @Watch('coin')
  onCoinChange () {
    this.stake = ''
  }

  @Watch('coin', { immediate: true })
  @Watch('payload', { immediate: true })
  onPayloadChange () {
    this.changeMaxAmount()

    if (this.stake >= this.maxAmount) {
      this.changeStake(this.maxAmount)
    }
  }

  changeValidator (pubKey: string): void {
    this.pubKey = pubKey
  }

  changeCoin (coin: string): void {
    this.coin = coin
  }

  changeStake (stake: string): void {
    this.stake = stake
  }

  changeMaxAmount (): void {
    if (!this.state.wallet) return
    if (!this.state.wallet.balances) return

    const balance = this.state.wallet.balances.find((item) => item.coin === this.coin)

    if (!balance) return

    let amount = new Big(balance.amount)

    if (this.coin === ECoin.BIP) {
      amount = amount.minus(this.getFee(ETxType.Delegate))
    }

    this.maxAmount = amount ? `${amount.toFixed()}` : ''
  }

  reset (): void {
    this.pubKey = ''
    this.coin = ''
    this.stake = ''
    this.payload = ''
    this.hash = ''
    this.loading = false
  }

  async submit (): Promise<void> {
    try {
      this.loading = true
      const response = await this.postman.txDelegate({
        pubKey: this.pubKey,
        coin: this.coin,
        stake: this.stake,
        payload: this.payload
      })
      this.hash = response.data.data.hash
      this.loading = false
    } catch (e) {
      this.reset()
      this.ui.commitError(e.message)
    }
  }

  close (): void {
    this.$root.$emit(AppEvent.WalletActionDelegateClose)
  }
}
</script>
