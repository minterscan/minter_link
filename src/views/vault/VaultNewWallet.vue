<template>
  <div class="view vault-new-wallet">
    <template>
      <h2 class="ant-typography">Generate new Minter wallet</h2>
      <a-form>
        <!-- Meta -->
        <wallet-meta-form
          :fresh="true"
          :changeColor="changeColor"
          :changeLabel="changeLabel"
        />

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
    </template>
  </div>
</template>

<script lang="ts">
import MetaForm from '@/mixins/MetaForm'
import { ERouter } from '@/model/Router'
import { Component, Mixins } from 'vue-property-decorator'
import WalletMetaForm from '@/components/wallet/forms/WalletMetaForm.vue'

const AUTO_REDIRECT_TIMEOUT = 100

@Component({
  name: 'VaultNewWallet',
  components: { WalletMetaForm }
})
export default class VaultNewWallet extends Mixins(MetaForm) {
  protected async submit (): Promise<void> {
    this.ui.commitLoading(true)

    // SetTimeout to prevent browser freeze on seed processing
    setTimeout(async () => {
      try {
        const vault = await this.postman.newWallet({
          label: this.label,
          color: this.color
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
