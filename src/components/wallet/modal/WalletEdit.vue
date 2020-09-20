<template >
  <a-modal
    centered
    okText="Save changes"
    cancelText="Close"
    @cancel="close()"
    :visible="visible"
    :confirmLoading="loading"
    :destroyOnClose="true"
    title="Wallet settings  "
    wrapClassName="cp wallet-edit"
  >
    <!-- Loading Indicator -->
    <loading v-show="loading" />

    <!-- Form -->
    <wallet-meta-form :changeIcon="changeIcon" :changeLabel="changeLabel" />

    <!-- Buttons -->
    <template slot="footer">
      <a-button ghost type="danger" @click="deleteWallet()">
        Delete
      </a-button>
      <div>
        <a-button key="back" @click="close()">
          Close
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="submit()">
          Save changes
        </a-button>
      </div>
    </template>
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
    this.icon = wallet.meta.icon
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

  deleteWallet (): void {
    this.$confirm({
      parentContext: this,
      title: 'Are you sure want to delete this wallet?',
      content: 'It can not be undone!',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          if (!this.state.vault) { return }

          const activeWallet = await this.postman.deleteWallet()

          // Switch active wallet
          this.state.commitVaultWalletDelete(this.state.vault.activeWallet)
          this.state.commitVaultActiveWallet(activeWallet)

          // Close modal window
          this.visible = false
        } catch (e) {
          this.ui.commitError(e)
        }
      }
    })
  }

  async submit (): Promise<void> {
    try {
      this.loading = true

      await this.postman.setVaultWalletMeta({
        address: this.state.vault.activeWallet,
        meta: {
          label: this.label,
          icon: this.icon
        }
      })

      setTimeout(() => {
        this.state.commitVaultWalletLabel(this.label)
        this.state.commitVaultWalletIcon(this.icon)
        this.close()
      }, this.config.const.autoRedirectTimeout)
    } catch (e) {
      this.loading = false
      this.ui.commitError(e)
    }
  }

  close (): void {
    this.label = ''
    this.icon = ''
    this.visible = false
  }
}
</script>
