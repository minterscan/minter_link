<template >
  <a-modal
    centered
    class="cp action-send"
    title="Send coins"
    :visible="true"
    :okText="hash ? 'Send again' : 'Send'"
    cancelText="Close"
    @ok="hash ? resetHash() : submit()"
    :confirmLoading="loading"
    :okButtonProps="{ props: { disabled: loading || invalid } }"
    :cancelButtonProps="{ props: {disabled: loading} }"
    @cancel="close"
  >
    <!-- Tx Success notification -->
    <tx-success v-if="hash" :hash="hash" />

    <a-form v-else>
      <!-- Recipient mode -->
      <a-form-item>
        <a-radio-group v-model="mode">
          <a-radio-button :value="modes[0]">New Address</a-radio-button>
          <a-radio-button :value="modes[1]">Contacts</a-radio-button>
          <a-radio-button :value="modes[2]">My Wallets</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <!-- Address -->
      <a-form-item v-if="isModeAddress">
        <a-input-group compact>
          <a-input
            size="large"
            v-model="address"
            :disabled="loading"
            placeholder="Address"
          >
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-input-group>
      </a-form-item>

      <!-- Contacts -->
      <a-form-item v-if="isModeContact">
        <a-input-group compact>
          <address-book-select :change="changeAddress" />
        </a-input-group>
      </a-form-item>

      <!-- Wallets -->
      <a-form-item v-if="isModeWallet">
        <a-input-group compact>
          <wallet-select :wallets="wallets" :change="changeAddress" />
        </a-input-group>
      </a-form-item>
      <!-- Amount & Coin -->
      <a-form-item>
        <a-input-group compact>
          <field-amount :change="changeAmount" :max="maxAmount" :defaultValue="amount" />
          <wallet-coin-select :coins="walletCoins" :change="changeCoin" />
        </a-input-group>
      </a-form-item>

      <!-- Payload -->
      <a-form-item class="">
        <a-switch id="with-payload" v-model="withPayload" />
        <label for="with-payload" title="Payload">Message</label>
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
    <div class="insufficient-funds" v-if="amount > maxAmount && !hash">Insufficient funds</div>
  </a-modal>
</template>

<script lang="ts">
import Big from 'bignumber.js'
import TxForm from '@/mixins/TxForm'
import { ETxType } from '@/model/Tx'
import { ECoin } from '@/model/Wallet'
import { VaultWallets } from '@/model/Vault'
import { isValidAddress } from 'minterjs-util'
import Icon from 'vue-awesome/components/Icon.vue'
import { AppEvent, AppSendMode } from '@/model/App'
import Loading from '@/components/common/Loading.vue'
import TxSuccess from '@/components/common/tx/TxSuccess.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import FieldAmount from '@/components/common/form/FieldAmount.vue'
import WalletSelect from '@/components/common/form/WalletSelect.vue'
import WalletCoinSelect from '@/components/common/form/WalletCoinSelect.vue'
import AddressBookSelect from '@/components/common/form/AddressBookSelect.vue'

@Component({
  name: 'ActionSend',
  components: { AddressBookSelect, Icon, FieldAmount, Loading, TxSuccess, WalletSelect, WalletCoinSelect }
})
export default class ActionSend extends Mixins(TxForm) {
  address = ''
  coin: string = ECoin.BIP
  amount = ''
  loading = false
  mode: AppSendMode = AppSendMode.Address
  modes: AppSendMode[] = [
    AppSendMode.Address,
    AppSendMode.Contact,
    AppSendMode.Wallet
  ]

  get invalid (): boolean {
    return (
      !this.coin ||
      !this.address ||
      this.amount === '' ||
      this.invalidPayload ||
      this.amount > this.maxAmount ||
      !isValidAddress(this.address) ||
      (new Big(this.amount).toNumber()) < 0
    )
  }

  get isModeAddress (): boolean {
    return this.mode === AppSendMode.Address
  }

  get isModeContact (): boolean {
    return this.mode === AppSendMode.Contact
  }

  get isModeWallet (): boolean {
    return this.mode === AppSendMode.Wallet
  }

  get wallets (): VaultWallets {
    if (!this.state.vault) return {}

    return this.state.vault?.wallets
  }

  @Watch('mode')
  onModeChange () {
    this.address = ''
    this.hash = ''
    this.loading = false
  }

  @Watch('coin')
  onCoinChange () {
    this.amount = ''
  }

  @Watch('coin', { immediate: true })
  @Watch('payload', { immediate: true })
  onPayloadChange () {
    this.changeMaxAmount()

    if (this.amount >= this.maxAmount) {
      this.changeAmount(this.maxAmount)
    }
  }

  changeAddress (address: string) {
    this.address = address
  }

  changeAmount (amount: string) {
    this.amount = amount
  }

  changeCoin (coin: string): void {
    this.coin = coin
  }

  changeMaxAmount (): void {
    if (!this.state.wallet) return
    if (!this.state.wallet.balances) return

    const balance = this.state.wallet.balances.find((item) => item.coin === this.coin)

    if (!balance) return

    let amount = new Big(balance.amount)

    if (this.coin === ECoin.BIP) {
      amount = amount.minus(this.getFee(ETxType.Send))
    }

    this.maxAmount = amount ? `${amount.toFixed()}` : ''
  }

  resetForm (): void {
    this.address = ''
    this.coin = ECoin.BIP
    this.amount = ''
    this.payload = ''
    this.loading = false
  }

  resetHash (): void {
    this.hash = ''
  }

  async submit (): Promise<void> {
    try {
      this.loading = true

      const response = await this.postman.txSend({
        address: this.address,
        coin: this.coin,
        amount: this.amount,
        payload: this.payload
      })

      this.reset()
      this.hash = response.data.data.hash
    } catch (e) {
      this.reset()
      this.ui.commitError(e.message)
    }
  }

  close (): void {
    this.$root.$emit(AppEvent.WalletActionSendClose)
  }
}
</script>
