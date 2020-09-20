<template>
  <div class="view vault-import-wallet">
    <!-- Header -->
    <view-header title="Import wallet" />

    <!-- Content -->
    <p>Paste your 12 word phrase to access your wallet</p>
    <a-form>
      <!-- Seed -->
      <a-form-item label="" layout="vertical">
        <a-textarea
          ref="input"
          v-model="seed"
          placeholder="Wallet Seed"
          :autoSize="{ minRows: 2, maxRows: 2 }"
        />
      </a-form-item>

      <!-- Meta -->
      <wallet-meta-form :changeIcon="changeIcon" :changeLabel="changeLabel" :fresh="true" />

      <!-- Buttons -->
      <a-form-item>
        <a-button type="primary" @click="submit()">
          Import
        </a-button>
        <a-button @click="cancel()">
          Cancel
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import Input from '@/mixins/Input'
import MetaForm from '@/mixins/MetaForm'
import { ERouter } from '@/model/Router'
import { Component, Mixins } from 'vue-property-decorator'
import ViewHeader from '@/components/common/ViewHeader.vue'
import WalletMetaForm from '@/components/wallet/forms/WalletMetaForm.vue'

@Component({
  name: 'VaultImportWallet',
  components: { ViewHeader, WalletMetaForm }
})
export default class VaultImportWallet extends Mixins(Input, MetaForm) {
  seed = ''

  async submit (): Promise<void> {
    this.ui.commitLoading(true)

    // SetTimeout to prevent browser freeze on seed processing
    setTimeout(async () => {
      try {
        const vault = await this.postman.importWallet({
          seed: this.seed.trim(),
          meta: {
            label: this.label.trim(),
            icon: this.icon
          }
        })

        this.state.commitVault(vault)
        await this.navigate(ERouter.Vault)
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
