<template >
  <a-modal
    centered
    class="cp action-send"
    title="Accept"
    :visible="true"
    :okText="hash ? 'Send again' : 'Send'"
    cancelText="Reject"
    @ok="hash ? reset() : submit()"
    :confirmLoading="loading"
    :okButtonProps="{ props: { disabled: loading || invalid } }"
    :cancelButtonProps="{ props: {disabled: loading} }"
    @cancel="close"
  >

  </a-modal>
</template>

<script lang="ts">
import TxForm from '@/mixins/TxForm'
import { Merchant } from 'minter-connect'
import { VaultWallets } from '@/model/Vault'
import { isValidAddress } from 'minterjs-util'
import Icon from 'vue-awesome/components/Icon.vue'
import { AppEvent, AppSendMode } from '@/model/App'
import { ECoin, MinterWallet } from '@/model/Wallet'
import Loading from '@/components/common/Loading.vue'
import TxSuccess from '@/components/common/tx/TxSuccess.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import MerchantInfo from '@/components/merchant/MerchantInfo.vue'
import WalletSelect from '@/components/common/form/WalletSelect.vue'
import WalletCoinSelect from '@/components/common/form/WalletCoinSelect.vue'
import AddressBookSelect from '@/components/common/form/AddressBookSelect.vue'

@Component({
  name: 'PaymentRequest',
  components: {
    AddressBookSelect,
    Icon,
    Loading,
    MerchantInfo,
    TxSuccess,
    WalletSelect,
    WalletCoinSelect
  }
})
export default class ActionSend extends Mixins(TxForm) {
  address = ''
  coin: string = ECoin.BIP
  amount = ''
  loading = false
  merchant: Merchant | null = null

  get invalid (): boolean {
    return (
      !this.coin ||
      !this.address ||
      this.amount === '' ||
      !isValidAddress(this.address)
    )
  }

  get wallets (): VaultWallets {
    if (!this.state.vault) { return {} }

    return this.state.vault?.wallets
  }

  reset (): void {
    this.address = ''
    this.coin = ECoin.BIP
    this.amount = ''
    this.payload = ''
    this.hash = ''
    this.loading = false
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
      this.hash = response.data.data.hash
      this.loading = false
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
