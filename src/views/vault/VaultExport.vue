<template>
  <div class="view vault-export">
    <!-- Header -->
    <view-header title="Export account">
      <template slot="extra">
        <clipboard-button :text="encodedVault" type="primary" />
      </template>
    </view-header>

    <!-- Content -->
    <p>Click the button to copy your encoded account string</p>

    <!-- Input -->
    <a-form-item label="" layout="vertical">
      <a-textarea
        disabled
        v-model="encodedVault"
        placeholder="Encoded account string"
        :autoSize="{ minRows: 3, maxRows: 16 }"
      />
    </a-form-item>

    <!-- Message -->
    <a-alert
      type="info"
      message="Encoded strings contains all your current wallets & contacts"
    />
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { ERouter } from '@/model/Router'
import { Component, Mixins } from 'vue-property-decorator'
import ViewHeader from '@/components/common/ViewHeader.vue'
import ClipboardButton from '@/components/common/ClipboardButton.vue'

@Component({
  name: 'VaultExport',
  components: { ClipboardButton, ViewHeader }
})
export default class VaultExport extends Mixins(Base) {
  protected encodedVault = ''

  async mounted () {
    try {
      this.encodedVault = await this.postman.getVaultEncoded()
    } catch (e) {
      this.ui.commitError(e)
    }
  }

  close () {
    this.navigate(ERouter.Vault)
  }
}
</script>
