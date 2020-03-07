<template>
  <div class="view vault-export">
    <h2 class="ant-typography">Export account</h2>
    <p>Copy your encoded account string</p>
    <a-form>
      <!-- Input -->
      <a-form-item label="" layout="vertical">
        <a-textarea
          disabled
          v-model="encodedVault"
          placeholder="Encoded account string"
          :autosize="{ minRows: 3, maxRows: 16 }"
        />
      </a-form-item>
      <!-- Submit -->
      <a-form-item>
        <clipboard-button :text="encodedVault" type="primary" />
        <a-button @click="close()">Close</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { ERouter } from '@/model/Router'
import { Component, Mixins } from 'vue-property-decorator'
import ClipboardButton from '@/components/common/ClipboardButton.vue'

@Component({
  name: 'VaultExport',
  components: { ClipboardButton }
})
export default class VaultExport extends Mixins(Base) {
  protected encodedVault = ''

  async mounted () {
    try {
      this.encodedVault = await this.postman.getVaultEncoded()
    } catch (e) {
      this.ui.commitError(e.message)
    }
  }

  close () {
    this.navigate(ERouter.Vault)
  }
}
</script>
