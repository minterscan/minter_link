<template>
  <div class="cp vault-empty">
    <!-- Unicorn -->
    <icon class="fucking-awesome-unicorn" name="unicorn" scale="15" />

    <!-- Buttons -->
    <a-button type="primary" shape="round" icon="plus" size="large" @click="newWallet()">
      New Wallet
    </a-button>
    <a-button type="primary" shape="round" icon="download" size="large" @click="importWallet()">
      Import Wallet
    </a-button>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { ERouter } from '@/model/Router'
import Icon from 'vue-awesome/components/Icon.vue'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  name: 'VaultEmpty',
  components: { Icon }
})
export default class VaultEmpty extends Mixins(Base) {
  async newWallet (): Promise<void> {
    await this.navigate(ERouter.VaultNewWallet)
  }

  async importWallet (): Promise<void> {
    await this.navigate(ERouter.VaultImportWallet)
  }
}
</script>
