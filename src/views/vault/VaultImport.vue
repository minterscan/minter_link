<template>
  <div class="view vault-import">
    <h2 class="ant-typography">Import account</h2>
    <p>Paste your encoded account string below:</p>
    <a-form>
      <!-- Input -->
      <a-form-item label="" layout="vertical">
        <a-textarea
          v-model="encodedString"
          placeholder="Encoded account string"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
      </a-form-item>

      <!-- Alert -->
      <a-form-item>
        <a-alert
          type="warning"
          message="Be careful! After Import all existing data in Minter Link, including wallets and contacts will be overwritten!"
        />
      </a-form-item>

      <!-- Submit -->
      <a-form-item>
        <a-button type="primary" @click="submit()" :disabled="!encodedString">
          Import
        </a-button>
        <a-button @click="close()">
          Close
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import Base from '@/mixins/Base'
import { ERouter } from '@/model/Router'
import { Component, Mixins } from 'vue-property-decorator'

const AUTO_REDIRECT_TIMEOUT = 1000

@Component({
  name: 'VaultImport'
})
export default class VaultImport extends Mixins(Base) {
  protected encodedString = ''

  protected submit (): void {
    this.ui.commitLoading(true)

    setTimeout(async () => {
      try {
        await this.postman.createVault(this.encodedString)
        this.ui.commitLoading(false)
        this.navigate(ERouter.Home)
      } catch (e) {
        this.ui.commitError(e.message)
      } finally {
        this.reset()
      }
    }, AUTO_REDIRECT_TIMEOUT)
  }

  protected close (): void {
    this.navigate(ERouter.Home)
  }

  protected reset (): void {
    this.encodedString = ''
  }

  protected destroyed (): void {
    this.reset()
  }
}
</script>
