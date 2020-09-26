<template >
  <a-modal
    centered
    class="cp action-unbond"
    title="Unbond coins"
    :visible="true"
    :okText="hash ? 'Unbond again' : 'Unbond'"
    cancelText="Close"
    @ok="hash ? resetHash() : submit()"
    :confirmLoading="loading"
    :okButtonProps="{ props: { disabled: loading || (!hash && invalid) } }"
    :cancelButtonProps="{ props: { disabled: loading } }"
    @cancel="close"
  >
    <!-- Tx Success -->
    <tx-success v-if="hash" :hash="hash" />

    <a-form v-else>
      <!-- Validator -->
      <a-form-item class="select-form-item">
        <validator-select :validators="validators" :change="changeValidator" />
      </a-form-item>

      <!-- Amount & Coin -->
      <a-form-item>
        <a-input-group compact>
          <a-input-number
            :min="0"
            size="large"
            v-model.number="stake"
            decimalSeparator=","
            :disabled="loading"
            placeholder="Amount"
          />
          <coin-select :coins="coins" :change="changeCoin" />
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
  </a-modal>
</template>

<script lang="ts">
import TxForm from '@/mixins/TxForm'
import { AppEvent } from '@/model/App'
import Icon from 'vue-awesome/components/Icon.vue'
import Loading from '@/components/common/Loading.vue'
import { isValidPublicKeyString } from 'minterjs-util'
import TxSuccess from '@/components/common/tx/TxSuccess.vue'
import CoinSelect from '@/components/common/form/CoinSelect.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import ValidatorSelect from '@/components/common/form/ValidatorSelect.vue'
import WalletCoinSelect from '@/components/common/form/WalletCoinSelect.vue'

@Component({
  name: 'ActionUnbond',
  components: { CoinSelect, Icon, Loading, TxSuccess, ValidatorSelect, WalletCoinSelect }
})
export default class ActionUnbond extends Mixins(TxForm) {
  pubKey = ''
  coin = ''
  stake = ''
  loading = false

  get invalid (): boolean {
    return (
      !this.pubKey ||
      !this.coin ||
      this.stake === '' ||
      this.invalidPayload ||
      !isValidPublicKeyString(this.pubKey)
    )
  }

  @Watch('coin')
  onCoinChange (): void {
    this.stake = ''
  }

  changeCoin (coin: string): void {
    this.coin = coin
  }

  changeValidator (pubKey: string): void {
    this.pubKey = pubKey
  }

  resetForm (): void {
    this.pubKey = ''
    this.coin = ''
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

      const hash = await this.postman.txUnbond({
        pubKey: this.pubKey,
        coin: this.coin,
        stake: this.stake,
        gasCoin: this.gasCoin,
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
    this.$root.$emit(AppEvent.WalletActionUnbondClose)
  }
}
</script>
