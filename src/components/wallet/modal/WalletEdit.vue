<template >
  <a-modal
    centered
    @ok="submit"
    @cancel="close"
    okText="Save changes"
    cancelText="Close"
    :visible="visible"
    :confirmLoading="loading"
    :title="state.walletLabel | short"
  >
    <!-- Loading Indicator -->
    <loading v-show="loading" />

    <wallet-meta-form :changeColor="changeColor" :changeLabel="changeLabel" />
  </a-modal>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { AppEvent } from '@/model/App'
import MetaForm from '@/mixins/MetaForm'
import { MinterWallet } from '@/model/Wallet'
import Loading from '@/components/common/Loading.vue'
import { Component, Mixins, Watch } from 'vue-property-decorator'
import WalletMetaForm from '@/components/wallet/forms/WalletMetaForm.vue'

const AUTO_CLOSE_TIMEOUT = 500

@Component({
  name: 'WalletEdit',
  components: { Loading, WalletMetaForm }
})
export default class WalletEdit extends Mixins(Base, MetaForm) {
  visible = false
  loading = false

  @Watch('state.wallet')
  onWalletChange (wallet: MinterWallet): void {
    this.label = wallet.meta.label
    this.color = wallet.meta.color
  }

  mounted (): void {
    this.$root.$on(AppEvent.WalletMetaOpen, () => {
      this.visible = true
      this.loading = false
    })
    this.$root.$on(AppEvent.FormSuccess, () => {
      this.loading = false
    })
  }

  async submit (): Promise<void> {
    try {
      this.loading = true

      await this.postman.setVaultActiveWalletMeta({
        label: this.label,
        color: this.color
      })

      setTimeout(() => {
        this.close()
        this.state.commitVaultWalletLabel(this.label)
        this.state.commitVaultWalletColor(this.color)
      }, AUTO_CLOSE_TIMEOUT)
    } catch (e) {
      this.loading = false
      this.ui.commitError(e.message)
    }
  }

  close (): void {
    this.visible = false
  }
}
</script>
