<template >
  <a-modal
    centered
    class="cp action-unbond"
    title="Unbond coins"
    :visible="true"
    :okText="hash ? 'Unbond again' : 'Unbond'"
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
      <!-- Validator -->
      <a-form-item class="select-form-item">
        <validator-select :validators="validators" :change="changeValidator" />
      </a-form-item>

      <!-- Amount & Coin -->
      <a-form-item>
        <a-input-group compact>
          <a-input-number
            :min="0"
            :max="10"
            :step="0.1"
            size="large"
            v-model="stake"
            :disabled="loading"
            placeholder="Amount"
          />
          <coin-select :coins="coins" :change="changeCoin" />
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

@Component({
  name: 'ActionUnbond',
  components: { CoinSelect, Icon, Loading, TxSuccess, ValidatorSelect }
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
  onCoinChange () {
    this.stake = ''
  }

  changeCoin (coin: string): void {
    this.coin = coin
  }

  changeValidator (pubKey: string): void {
    this.pubKey = pubKey
  }

  reset (): void {
    this.pubKey = ''
    this.coin = ''
    this.stake = ''
    this.hash = ''
    this.loading = false
  }

  async submit (): Promise<void> {
    try {
      this.loading = true
      const response = await this.postman.txUnbond({
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
    this.$root.$emit(AppEvent.WalletActionUnbondClose)
  }
}
</script>
