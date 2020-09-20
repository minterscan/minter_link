<template>
  <div class="view vault-new-wallet">
    <!-- Header -->
    <view-header title="Make new wallet" />

    <!-- Form -->
    <a-form>
      <!-- Meta -->
      <wallet-meta-form :fresh="true" :changeIcon="changeIcon" :changeLabel="changeLabel" />

      <!-- Buttons -->
      <a-form-item>
        <a-button type="primary" @click="submit()">
          Create
        </a-button>
        <a-button @click="cancel()">
          Cancel
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import MetaForm from '@/mixins/MetaForm'
import { ERouter } from '@/model/Router'
import { Component, Mixins } from 'vue-property-decorator'
import ViewHeader from '@/components/common/ViewHeader.vue'
import WalletMetaForm from '@/components/wallet/forms/WalletMetaForm.vue'

@Component({
  name: 'VaultNewWallet',
  components: { ViewHeader, WalletMetaForm }
})
export default class VaultNewWallet extends Mixins(MetaForm) {
  async submit (): Promise<void> {
    this.ui.commitLoading(true)

    // SetTimeout to prevent browser freeze on seed processing
    setTimeout(async () => {
      try {
        const vault = await this.postman.newWallet({
          label: this.label,
          icon: this.icon
        })

        this.navigate(ERouter.Vault)
        this.state.commitVault(vault)
      } catch (e) {
        this.ui.commitLoading(false)
        this.ui.commitError(e)
      }
    }, this.config.const.autoRedirectTimeout)
  }

  cancel (): void {
    this.navigate(ERouter.Vault)
  }
}
</script>
