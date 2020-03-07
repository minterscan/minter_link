<template>
  <div class="view vault-import-wallet">
    <template>
      <h2 class="ant-typography">Import wallet from Seed Phrase</h2>
      <p>Paste your 12 word phrase to access your wallet</p>
      <a-form>
        <!-- Seed -->
        <a-form-item label="" layout="vertical">
          <a-textarea
            ref="input"
            v-model="seed"
            placeholder="Wallet Seed"
            :autosize="{ minRows: 5, maxRows: 5 }"
          />
        </a-form-item>

        <!-- Meta -->
        <wallet-meta-form :changeColor="changeColor" :changeLabel="changeLabel" :fresh="true" />

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
    </template>
  </div>
</template>

<script lang="ts">
import Input from '@/mixins/Input'
import MetaForm from '@/mixins/MetaForm'
import { ERouter } from '@/model/Router'
import { Component, Mixins } from 'vue-property-decorator'
import WalletMetaForm from '@/components/wallet/forms/WalletMetaForm.vue'

const AUTO_REDIRECT_TIMEOUT = 100

@Component({
  name: 'VaultImportWallet',
  components: { WalletMetaForm }
})
export default class VaultImportWallet extends Mixins(Input, MetaForm) {
  protected seed = ''

  protected async submit (): Promise<void> {
    this.ui.commitLoading(true)

    // SetTimeout to prevent browser freeze on seed processing
    setTimeout(async () => {
      try {
        const vault = await this.postman.importWallet({
          seed: this.seed.trim(),
          meta: {
            label: this.label.trim(),
            color: this.color
          }
        })

        this.state.commitVault(vault)
        await this.navigate(ERouter.Vault)
      } catch (e) {
        this.ui.commitLoading(false)
        this.ui.commitError(e.message)
      }
    }, AUTO_REDIRECT_TIMEOUT)
  }

  cancel (): void {
    this.navigate(ERouter.Vault)
  }
}
</script>
